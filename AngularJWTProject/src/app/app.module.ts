import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  
import {DataTablesModule} from 'angular-datatables'; 

import { AppComponent } from './app.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewmyaccountsComponent } from './viewmyaccounts/viewmyaccounts.component';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { ViewusersComponent } from './viewusers/viewusers.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent,
    AddAccountComponent,
    ListAccountsComponent,
    AccountDetailsComponent,
    UpdateAccountComponent,
    SearchComponent,
    LoginComponent,
    SignupComponent,
    ViewmyaccountsComponent,
    ViewusersComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule,  
    DataTablesModule  
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthorizationInterceptor,multi:true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
