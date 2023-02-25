import { Component, OnInit } from '@angular/core';
import { AccountServiceService} from '../account-service.service';
import {FormControl,FormGroup,Validators} from '@angular/forms'; 
import { Account} from '../account';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  constructor(private accountservice : AccountServiceService) { }
  account =new Account();
  submitted = false;  
  
  ngOnInit() {  
    this.submitted=false;  
  }  

  accountsaveform=new FormGroup({
    aid:new FormControl('',[Validators.required , Validators.minLength(3) ])  ,
    balance:new FormControl('',[Validators.required,Validators.min(2000)])
  });  

  saveAccount(){  
 
    this.account=new Account();   
    this.account.aid=this.Aid.value;    
    this.account.balance=this.Balance.value;  
    this.submitted = true;  
    this.save();  
  }  
  
    
  
  save() {  
    this.accountservice.createAccount(this.account)  
      .subscribe(data => console.log(data), error => console.log(error));  
    this.account = new Account();  
  }  
  

  get Aid(){  
    return this.accountsaveform.get('aid');  
  }  
  
 
  
  get Balance(){  
    //this.accountsaveform.controls.balance
    return this.accountsaveform.get('balance');  
  }  

  
  addAccountForm(){  
    this.submitted=false;  
    this.accountsaveform.reset();  
  }  

}
