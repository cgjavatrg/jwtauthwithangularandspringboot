import { ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import {AccountDetailsComponent } from '../account-details/account-details.component';
import { Observable } from "rxjs";
import {AccountServiceService} from '../account-service.service';
import { Account } from '../account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css']
})
export class ListAccountsComponent implements OnInit {
  accounts: Account[]=[];

  constructor(private accountservice:AccountServiceService,
     private router:Router , private cdr: ChangeDetectorRef) { }

   
  ngOnInit(): void {
    this.reloadData();
  }

  // ngDoCheck():void {
  //   this.reloadData();
  // }
  
  reloadData() {
    this.accountservice.getAccountsList().subscribe(
      data=>{
        this.accounts=data;
        this.cdr.markForCheck();
      },
      error=>console.log(error)
    );
  }

  deleteAccount(id: number) {
    this.accountservice.deleteAccount(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  accountDetails(id:number):void{
    
      this.router.navigate(['account-details', id]);
    
  }

  goForUpdate(id: number):void{
    this.router.navigate(['update-account', id]);
  }

  linkaccountwithuser(acc:Account):void{

     this.router.navigate(['viewusers', acc.aid]);
    
  }
}
