import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private httpClient: HttpClient) { }

  Add(body): Observable<any>{
    return this.httpClient.post(`${BASEURL}\messages\chat`, body, this.options);
  }
  GetSpecificAll(): Observable<any> {
    return this.httpClient.get(`${BASEURL}\messages\chat-specific`, this.options);
  }
  GetAll(): Observable<any>{
    return this.httpClient.get(`${BASEURL}\messages\chat`, this.options);
  }
}
