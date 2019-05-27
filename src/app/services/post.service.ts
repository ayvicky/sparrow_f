import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable }  from 'rxjs';
import { Global } from '../helpers/global';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { 

    
  }

  registerUser(body): Observable<any> {
    return this.http.post(`${Global.BASEURL}/posts/register`, body);
  }

  getUsers(): Observable<any>{
    
    return this.http.get(`${Global.BASEURL}/posts/users/`, this.options);
  }
 
}
