import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from './token';
import { AuthRequest } from './auth-request';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient : HttpClient) { }
  authenticate(authRequest : AuthRequest) : Observable<Token> {
    return this.httpClient.post<Token>("http://127.0.0.1:8000/api/v1/user/authentication/generic/login", authRequest).pipe(
      catchError(err=> {
        return throwError(err);
      })
    );
  }
  verify(token : Token) : Observable<Token> {
    return this.httpClient.post<Token>("http://127.0.0.1:8000/api/v1/user/authentication/token/verify", token).pipe(
      catchError(err=> {
        return throwError(err);
      })
    );
  }
}
