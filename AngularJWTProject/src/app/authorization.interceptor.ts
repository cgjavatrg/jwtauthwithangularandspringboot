import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Role } from './role.enum';
import { EMPTY } from 'rxjs/internal/observable/empty';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  private baseURL:string="http://localhost:4200/";
  constructor(private loginservice:UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Visted url =>"+request.url);
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      });
    }
    
    return next.handle(request);
   
  }
}
