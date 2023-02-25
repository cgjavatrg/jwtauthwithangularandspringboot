import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../role.enum';
import { UserDTO } from '../user-dto';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:UserDTO;
  username:string;
  password:string;
  loginerror:string=null;
  isLogin:boolean=false;
  constructor(private service:UserService,private router:Router) { }

  ngOnInit(): void {
    
    }

  myLogin():void {
    this.service.loginfun(this.username,this.password).subscribe(
      (data)=>{ 
        this.user=data;
      },
      (error)=>{ 
        if(error!==null || error!=='')
        {
         this.loginerror=error;
        }
        this.user=null;
        this.service.setUserDTO(null);
      },
      ()=>{
        this.loginerror=null;
        this.service.setUserDTO(this.user);
        console.log('Login completed');
      }
         
    );

    this.isLogin=this.service.getIsLoggedIn();


  }

}
