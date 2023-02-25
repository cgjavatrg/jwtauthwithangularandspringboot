import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Role } from './role.enum';
import { UserService } from './user.service';
import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private router:Router,private loginservice:UserService) { }

  canActivate(): boolean {
    // if(sessionStorage.getItem("username")===null ){
    //   alert('You are redirected to login Page');
     
    //   this.router.navigate(["loginurl"]);
    //   return false;
    // }
    
    if (!this.loginservice.getIsLoggedIn() ) {
      alert('You are redirected to login Page');
     
      this.router.navigate(["loginurl"]);
      return false;
    }else
    if(this.loginservice.getIsLoggedIn()==true && this.loginservice.getIsExpired()==true){
      alert('Session is Expired');
      this.loginservice.logout();
      this.router.navigate(["loginurl"]);
      return false;
    }
  
       else 
       if(this.loginservice.getIsLoggedIn()==true && this.loginservice.getActiveUser().role==Role.CUSTOMER)
       { 
         let currentUrl:string=this.router.getCurrentNavigation().extractedUrl.toString();
         console.log("URL => "+currentUrl);
          if( (currentUrl !="/viewmyaccounts") && (currentUrl != "/loginurl") ) {
           alert("You are not authorized to view this page")
           this.router.navigate(["viewmyaccounts"]);
           return false;
          }
         }
    return true;
  }
}
