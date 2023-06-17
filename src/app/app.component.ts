import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( public router: Router) {
    this.installApp();
  }
  installApp(){
    this.router.navigateByUrl('splash');
  }
}
