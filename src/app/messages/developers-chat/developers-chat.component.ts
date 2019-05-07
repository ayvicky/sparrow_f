import { Component, OnInit } from '@angular/core';

import io from 'socket.io-client';

@Component({
  selector: 'app-developers-chat',
  templateUrl: './developers-chat.component.html',
  styleUrls: ['./developers-chat.component.css']
})
export class DevelopersChatComponent implements OnInit {

  socket: any;

  constructor() { }

  ngOnInit() {
    this.socket = io('http://heroku.com');
    this.socket.emit('connect user', {username: 'A'});  
  }



}