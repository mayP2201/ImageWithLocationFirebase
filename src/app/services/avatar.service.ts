import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { doc, docData, Firestore, setDoc } from "@angular/fire/firestore";
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from "@angular/fire/storage";
import { Photo } from "@capacitor/camera";
import { Geolocation } from "@capacitor/geolocation";

@Injectable({
  providedIn: "root",
})
export class AvatarService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);
    // const permResult = Geolocation.requestPermissions();
    // console.log("Perm request result: ", permResult);

    try {
      await uploadString(storageRef, cameraFile.base64String, "base64");

      const imageUrl = await getDownloadURL(storageRef);
      const coordinates = await Geolocation.getCurrentPosition();
      const latitude = coordinates.coords.latitude;
      const longitude = coordinates.coords.longitude;
      console.log(typeof coordinates);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl,
        coords:{
          latitude,
          longitude,
        },
      });
      return true;
    } catch (e) {
      return null;
    }
  }
}
