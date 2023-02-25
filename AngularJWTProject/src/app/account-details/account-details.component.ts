import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountServiceService } from '../account-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  id: number;
  account:any;

  constructor(private route:ActivatedRoute,private router:Router,
    private accountservice:AccountServiceService) { }

  ngOnInit(): void {
    this.account = new Account();

    this.id = this.route.snapshot.params['id'];
    
    this.accountservice.getAccount(this.id)
      .subscribe(data => {
        console.log(data)
        this.account = data;
      }, error => console.log(error));
  }
  list(){
    this.router.navigate(['view-accounts']);
  }
}
