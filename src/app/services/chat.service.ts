import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatData = new EventEmitter<any>();
  constructor() { }

}
