import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable }  from 'rxjs';

import { User } from '../interfaces/user';

const BASEURL = 'http://localhost:8080/api';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) {     
  }
  
  public Login(body): Observable<any> {
    return this.http.post(`${BASEURL}/auth/login`, body, this.options);
  }

  public isLoggedin() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
