import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountServiceService } from '../account-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewmyaccounts',
  templateUrl: './viewmyaccounts.component.html',
  styleUrls: ['./viewmyaccounts.component.css']
})
export class ViewmyaccountsComponent implements OnInit {
  myaccounts:Account[]=[];
  myerror:string;
  constructor(private service:AccountServiceService,private userservice:UserService) { }

  ngOnInit(): void {
    this.service.getAccountsByUsername(this.userservice.getActiveUser().username).
    subscribe(
      data=>this.myaccounts=data,
      error=>{
        this.myerror=error;
        console.log(error);
        this.myaccounts=null;
      }

    );

  }

}
