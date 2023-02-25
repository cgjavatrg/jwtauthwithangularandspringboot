import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs'; 
import { Account } from './account';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private baseUrl:string = 'http://localhost:8082/';  
  
  constructor(private http:HttpClient) { }  
  
  getAccountsList(): Observable<Account[]> {  
    return this.http.get<Account[]>(`${this.baseUrl}`+'accounts').
    pipe(catchError(this.handleError));
  }  
  
  createAccount(account: object): Observable<Account> {  
    return this.http.post<Account>(`${this.baseUrl}`+'accounts', account)
    .pipe(catchError(this.handleError));
  }  
  
  deleteAccount(id: number): Observable<any> {  
    return this.http.delete(`${this.baseUrl}accounts/${id}`, { responseType: 'text' }).
    pipe(catchError(this.handleError));;  
  }  
  
  getAccount(id: number): Observable<Account> {  
    return this.http.get<Account>(`${this.baseUrl}accounts/${id}`)
    .pipe(catchError(this.handleError));  
  }  
  
  updateAccount(id: number, value: Account): Observable<Account> {  
    return this.http.put<Account> (`${this.baseUrl}accounts/${id}`, value).
    pipe(retry(1),catchError(this.handleError));
     
  }  

  getAccountsByCustomerName(name:string):Observable<Account[]> {
   let url:string=`${this.baseUrl}accountsByCust`; 
    return this.http.get<Account[]> (`${url}/${name}`)
    .pipe(catchError(this.handleError));
  }
  getAccountsByBalanceRange(a:number,b:number):Observable<Account[]> {
    let url:string=`${this.baseUrl}accountsByBalance/${a}/${b}`;
    return this.http.get<Account[]>(url)
    .pipe(catchError(this.handleError));
  }

  getAccountsByUsername(username:string):Observable<Account[]> {
    let url:string=`${this.baseUrl}accounts/byUser/${username}`;
    return this.http.get<Account[]>(url)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    let errorMsg:string='';
    if(error.error instanceof ErrorEvent){
        console.error('Client Side Error: ' , error.error.message);
        errorMsg=error.error.message;
       
    }else{
      console.error('Server Side Error: ', error);
      errorMsg=error.error;
     
    }

    
    return throwError(errorMsg);
      
  }
}

