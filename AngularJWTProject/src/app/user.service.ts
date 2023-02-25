import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { UserDTO } from './user-dto';
import { retry, catchError, map } from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl:string = 'http://localhost:8082/';  

  
  private activeUser: UserDTO=null;
  //private jwtHelper:JwtHelperService
  constructor(private http:HttpClient,private jwthelper:JwtHelperService) {

  }  

 

  getIsLoggedIn():boolean {
    let user = sessionStorage.getItem("username");
    console.log("User logged in "+(!(user === null)));

  
    return !(user === null );
   
  }

 getIsExpired() {
  let sessiontoken:any=sessionStorage.getItem("token");
  console.log(this.jwthelper.decodeToken(sessiontoken));
  let expiry:boolean= this.jwthelper.isTokenExpired(sessiontoken);

  console.log ("Token Expired => "+expiry);
  return expiry;
  //   let tokenPayload:any ;
  //   if(sessiontoken !== null) {
  //     tokenPayload= decode(sessiontoken);
  // }
  //   console.log("Token is "+JSON.stringify(tokenPayload));

 
  //  let expDate:Date =new Date(Number(tokenPayload.exp));
   
  //  //expDate.setTime(Number(tokenPayload.exp));
  //   console.log("Expires on  "+expDate.getTime() + " , Date "+expDate.toDateString());

  //   let today:Date=new Date();
  //   console.log("Today's ms "+today.getTime());
  //   console.log("Roles are "+ tokenPayload.roles);

    
  //   console.log("Expdate >= today "+ ( expDate.getTime() >= today.getTime()));
  //   return expDate.getTime() < today.getTime();
 }

  setUserDTO(userdto:UserDTO) {
    this.activeUser=userdto;
  }

  getActiveUser():UserDTO {
    return this.activeUser;
  }

  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
  }

  loginfun(username:string,password:string):Observable<UserDTO> {
    let params = new HttpParams()
    .set('username', username)
    .set('password', password)
    let url:string=`${this.baseUrl}accounts/login`;
     return this.http.post<UserDTO>(url,params   ).
     pipe( map(userData => {
      sessionStorage.setItem("username", userData.username);
      let tokenStr = "Bearer " + userData.token;
      sessionStorage.setItem("token", tokenStr);

      return userData;
    }),
    catchError(this.handleError));
  }

  createUser(regUser:User){
    let url:string=`${this.baseUrl}accounts/createUser`;
    return this.http.post(url,regUser, { responseType: 'text' }).
     pipe(catchError(this.handleError));
  }

  getAllUser():Observable<User[]> {
    let url:string=`${this.baseUrl}accounts/users`;
    return this.http.get<User[]>(url).
    pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    let errorMsg:string='';
    if(error.error instanceof ErrorEvent){
        console.error('Client Side Error: ' , error.error.message);
        errorMsg=error.error.message;
       
    }else{
      console.error('Server Side Error: ', error);
      errorMsg=error.error;
      console.log(errorMsg);
     
    }

    
    return throwError("Error Message =>"+errorMsg);
      
  }

  
}
