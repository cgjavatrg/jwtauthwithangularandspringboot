import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../account';
import { AccountServiceService } from '../account-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  accounts: Observable<Account[]>;
  myoption:number;

  constructor(private accountservice:AccountServiceService ) { }


  ngOnInit(): void {
  }

  getAccountsByName(name:string):void{
    this.accounts=this.accountservice.getAccountsByCustomerName(name);
  }

  getAccountsByRange(bal1:number,bal2:number):void {
    this.accounts=this.accountservice.getAccountsByBalanceRange(bal1,bal2);
  }

  clearList():void{
   // if(this.myoption==0) {
       this.accounts=null;
    //}
  }

}
