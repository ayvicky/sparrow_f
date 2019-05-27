import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable }  from 'rxjs';
import { Global } from '../helpers/global';


@Injectable({
  providedIn: 'root'
})
export class StoryService {
  options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { 

    
  }

  registerUser(body): Observable<any> {
    return this.http.post(`${Global.BASEURL}/stories/register`, body);
  }

  getUsers(): Observable<any>{
    
    return this.http.get(`${Global.BASEURL}/stories/users/`, this.options);
  }
 
}
