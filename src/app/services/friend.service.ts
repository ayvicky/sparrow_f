import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable }  from 'rxjs';
import { Global } from '../helpers/global';


@Injectable({
  providedIn: 'root'
})
export class FriendService {
  options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { 

    
  }

  add(body): Observable<any> {
    return this.http.post(`${Global.BASEURL}/friends/add`, body, this.options);
  }

  confirm(): Observable<any>{
    return this.http.put(`${Global.BASEURL}/friends/confirm`, this.options);
  }

  reject(): Observable<any>{
    return this.http.put(`${Global.BASEURL}/friends/reject`, this.options);
  }

  cancel(): Observable<any>{
    return this.http.delete(`${Global.BASEURL}/friends/cancel`, this.options);
  }

  remove(): Observable<any>{
    return this.http.delete(`${Global.BASEURL}/friends/remove`, this.options);
  }

  getAll(): Observable<any>{
    return this.http.get(`${Global.BASEURL}/friends`, this.options);
  }
 
}
