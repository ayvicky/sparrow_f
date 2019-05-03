import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable }  from 'rxjs';

const BASEURL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http: HttpClient) { 

    
  }

  registerUser(body): Observable<any> {
    return this.http.post(`${BASEURL}/users/register`, body);
  }

  getUsers(): Observable<any>{
    
    return this.http.get(`${BASEURL}/users/`);
  }
 
}
