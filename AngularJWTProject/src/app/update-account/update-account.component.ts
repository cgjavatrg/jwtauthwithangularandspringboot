import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountServiceService } from '../account-service.service';
import { ListAccountsComponent } from '../list-accounts/list-accounts.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  
  id:number;
  account:any;

  constructor(private route:ActivatedRoute , private router:Router ,
    private accountservice:AccountServiceService) { }


  ngOnInit(): void {
    this.account=new Account();

    this.id=this.route.snapshot.params['id'];

    this.accountservice.getAccount(this.id)
    .subscribe(data=>{
      console.log(data);
      this.account=data;

    },error=>console.log(error));
  }

  updateAccount() {
    this.accountservice.updateAccount(this.id, this.account)
      .subscribe(data => {
        console.log(data);
        this.account = new Account();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateAccount();    
  }

  gotoList() {
    this.router.navigate(['view-accounts']);
  }
}
