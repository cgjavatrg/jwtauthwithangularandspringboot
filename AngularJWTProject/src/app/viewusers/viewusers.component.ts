import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Account } from '../account';
import { AccountServiceService } from '../account-service.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  account:Account=null;
  users:User[]=[];
  id:number;
  constructor(private userservice:UserService ,private accservice:AccountServiceService,
    private route:ActivatedRoute ,private router:Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.account=new Account();

    //this.id=this.route.snapshot.params['id'];
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.id=parseInt(param.get('id'))
    });

    this.accservice.getAccount(this.id)
    .subscribe(data=>{
      console.log(data);
      this.account=data;

    },
    error=>console.log(error)
    );

    this.userservice.getAllUser().
    subscribe(
      (data)=>this.users=data,
      error=>console.log(error)
    );
  }

  onSelect(user:User):void {
    console.log("Selected USER => "+JSON.stringify(user));
    this.account.user=user;
    alert(JSON.stringify(this.account));
    this.accservice.updateAccount(this.account.aid,this.account)
    .subscribe(
      (data)=>{
        this.account=new Account();
        this.account=data;
        this.cdr.markForCheck();
        console.log("DATA => "+JSON.stringify(data));
        console.log("LINKED account => ") + JSON.stringify(this.account);
      },
      (error)=>console.log(error)
    );
    this.router.navigate(["view-accounts"]);
  }

}
