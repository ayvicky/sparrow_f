import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Global } from '../helpers/global';


@Injectable({
  providedIn: 'root'
})

export class MessageService {
  
  constructor(private httpClient: HttpClient) { }

  Add(body): Observable<any>{
    return this.httpClient.post(`${Global.BASEURL}/messages/chat`, body);
  }
  
  GetSpecificAll(sender_id, receiver_id): Observable<any> {
    return this.httpClient.get(`${Global.BASEURL}/messages/chat-specific/?sender_id=${sender_id}&receiver_id=${receiver_id}`);
  }
  
  GetAll(): Observable<any>{
    return this.httpClient.get(`${Global.BASEURL}/messages/chat`);
  }

}
