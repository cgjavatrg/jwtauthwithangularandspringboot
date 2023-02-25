import { DatePipe } from '@angular/common';
import { prepareSyntheticPropertyName } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../role.enum';
import { User } from '../user';
import { UserDTO } from '../user-dto';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //user:UserDTO;
  message:string;
  regUser:User=new User();
  submitted:boolean = false;  
  errorMsg:string=null;
  ngOnInit() {  
    this.submitted=false;  
  }  

    userRegform=new FormGroup({
    username:new FormControl('',[Validators.required , Validators.minLength(3) ])  ,
    password:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),  
    role:new FormControl('',[Validators.required]),
    fullName:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required,Validators.email]),

    });  


  constructor(private service:UserService) { }

  get Username(){  
    return this.userRegform.get('username');  
  }  

  
  get Passowrd(){  
    return this.userRegform.get('password');  
  }  

  get ROLE(){
    return this.userRegform.get('role');
  }

  get FullName() {
    return this.userRegform.get('fullName');
  }

  get Email() {
    return this.userRegform.get('email');
  }

  addUserForm(){  
    this.submitted=false;  
    this.userRegform.reset();  
  }  

  saveUser() {
    this.regUser.username=this.Username.value;
    this.regUser.password=this.Passowrd.value;
    if(this.ROLE.value=="CUSTOMER") 
    {
      this.regUser.role=Role.CUSTOMER;
    }else if (this.ROLE.value=="BANKEMPLOYEE"){
      this.regUser.role=Role.BANKEMPLOYEE;
    }
    let sysdate:Date=new Date();
    
  
   let dp=new DatePipe("en-US");
   let myDatestr=dp.transform(sysdate,"yyyy-MM-dd");
    this.regUser.createdAt=myDatestr;
    
    this.regUser.email=this.Email.value;

    this.regUser.fullName=this.FullName.value;
    //alert(myDatestr);
     
    this.service.createUser(this.regUser).subscribe(
      (data)=>
      {
        this.message=data;
        console.log(this.message);
      },
    
      (error)=>{
        if(error!==null || error!=='')
        {
          this.errorMsg=error;
        }
        this.submitted=false;
      },
      ()=>{
       // this.errorMsg=null;
        console.log('User Creation completed');
        this.errorMsg=null;
        this.submitted=true;
      }

    )
  }
}
