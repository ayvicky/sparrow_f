import { Component, OnInit } from '@angular/core';

import io from 'socket.io-client';
import { Global } from 'src/app/helpers/global';

@Component({
  selector: 'app-developers-chat',
  templateUrl: './developers-chat.component.html',
  styleUrls: ['./developers-chat.component.css']
})
export class DevelopersChatComponent implements OnInit {

  socket: any;

  constructor() { }

  ngOnInit() {
    this.socket = io(Global.BASEURL);
    this.socket.emit('connect user', {username: 'A'});  
  }



}