import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable }  from 'rxjs';

const BASEURL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { 

    
  }

  add(body): Observable<any> {
    return this.http.post(`${BASEURL}/friends/add`, body, this.options);
  }

  confirm(): Observable<any>{
    return this.http.put(`${BASEURL}/friends/confirm`, this.options);
  }

  reject(): Observable<any>{
    return this.http.put(`${BASEURL}/friends/reject`, this.options);
  }

  cancel(): Observable<any>{
    return this.http.delete(`${BASEURL}/friends/cancel`, this.options);
  }

  remove(): Observable<any>{
    return this.http.delete(`${BASEURL}/friends/remove`, this.options);
  }

  getAll(): Observable<any>{
    return this.http.get(`${BASEURL}/friends`, this.options);
  }
 
}
