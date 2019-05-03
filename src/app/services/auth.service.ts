import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable }  from 'rxjs';

import { User } from '../interfaces/user';
import { TokenService } from './token.service';

const BASEURL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private tokenService: TokenService) {     
  }
  
  public Login(body): Observable<any> {
    return this.http.post(`${BASEURL}/auth/login`, body);
  }

  public isLoggedin() {
    return this.tokenService.get() !== null;
//    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public signout(){
    return this.http.get(`${BASEURL}/auth/logout`);
//    localStorage.removeItem('ACCESS_TOKEN');
  }
}
