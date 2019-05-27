import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../helpers/global';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
 
  constructor(private http: HttpClient) {
    
   }

  add(body): Observable<any>{
    return this.http.post(`${Global.BASEURL}/announcements`, body);
  }

  getall(): Observable<any>{
    console.log('get all announcements');
    return this.http.get(`${Global.BASEURL}/announcements`);
  }
  getbyid(announcement_id): Observable<any>{
    return this.http.get(`${Global.BASEURL}/announcements/?announcement_id=${announcement_id}`);
  }
  getallbytype(type): Observable<any>{
    return this.http.get(`${Global.BASEURL}/announcements/?type=${type}`);
  }
  update(){

  }
  delete(){

  }
}
