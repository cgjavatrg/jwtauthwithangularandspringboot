import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp';
  constructor(private router:Router,private loginservice:UserService) {

  }

  logout() {
    this.loginservice.setUserDTO(null);
    this.loginservice.logout();
      this.router.navigate(['loginurl']);
  }
}
