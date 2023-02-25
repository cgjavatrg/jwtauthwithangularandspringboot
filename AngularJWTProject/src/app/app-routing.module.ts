import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAccountComponent } from './add-account/add-account.component';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserService } from './user.service';
import { ViewmyaccountsComponent } from './viewmyaccounts/viewmyaccounts.component';
import { AuthguardService } from './authguard.service';
import { ViewusersComponent } from './viewusers/viewusers.component';


const routes: Routes = [  
  { path: '', redirectTo: 'loginurl', pathMatch: 'full' },  
  { path: 'add-account', component: AddAccountComponent ,canActivate:[AuthguardService]},  
  { path: 'view-accounts', component: ListAccountsComponent,canActivate:[AuthguardService] }, 
  { path: 'account-details/:id',component:AccountDetailsComponent,canActivate:[AuthguardService]} ,
  { path: 'update-account/:id',component:UpdateAccountComponent,canActivate:[AuthguardService]},
  { path: 'searchAccount',component:SearchComponent,canActivate:[AuthguardService]},
  { path:"loginurl",component:LoginComponent},
  { path:"signup",component:SignupComponent},
   { path:"viewmyaccounts",component:ViewmyaccountsComponent,canActivate:[AuthguardService]},
   { path:"viewusers/:id",component:ViewusersComponent,canActivate:[AuthguardService]}
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
