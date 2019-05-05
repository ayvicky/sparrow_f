import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  
  constructor(private httpClient: HttpClient) { }

  Add(body): Observable<any>{
    return this.httpClient.post(`${BASEURL}/messages/chat`, body);
  }
  GetSpecificAll(sender_id, receiver_id): Observable<any> {
    const params = new HttpParams();
    params.set('sender_id', sender_id);
    params.set('receiver_id', receiver_id);
    return this.httpClient.get(`${BASEURL}/messages/chat-specific/?sender_id=${sender_id}&receiver_id=${receiver_id}`);
  }
  GetAll(): Observable<any>{

    return this.httpClient.get(`${BASEURL}/messages/chat`);
  }

}
