import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  set(token) {
    this.cookieService.set('access_token', token);
  }
  
  get() {
    return this.cookieService.get('access_token');
  }

  delete() {
    this.cookieService.delete('access_token');
  }

  GetPayload() {
    const token = this.get();
    let payload;

    if(token) {
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }
    return payload.data;
  }
}
