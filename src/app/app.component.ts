import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import io from 'socket.io-client';
import * as moment from 'moment';
import _ from 'lodash';

import { Global } from './helpers/global';

import {
  TokenService,
  ChatService,
  MessageService
} from './services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'socal-funda';
  socketHost;
  socket;
  token;
  user: any;

  personalmessages = [];
  receivername = '';
  receiver_id: any;
  isActiveChat = false;
  isShowChat = true;
  msg: any;

  constructor(
    private tokenService: TokenService,
    private router: Router, private chatService: ChatService,
    private messageService: MessageService) {
    this.socketHost = Global.BASEURL;
    this.socket = io(this.socketHost);

    this.chatService.chatData.subscribe(data => {
      this.isActiveChat = true;
      this.receivername = data.username;
      this.receiver_id = data._id;

      this.getSpecificMessages();

      this.socket.emit('join private chat',
        {
          room1: this.user._id,
          room2: this.receiver_id
        }
      );
    });
  }

  ngOnInit() {

    this.token = this.tokenService.get();
    if (this.token) {
      //  this.router.navigate(['users']);        
      this.user = this.tokenService.GetPayload();

      console.log(this.user);
      this.socket.emit('online', { room: 'global', user: this.user.username });
    } else {
      this.router.navigate([]);
    }


    this.socket.on('private chat message', data => {
      console.log('private message receive');
      console.log(data);
      if ((data.receiver_id === this.user._id || data.sender_id === this.user._id) && (data.sender_id === this.receiver_id || data.receiver_id === this.receiver_id)) {
        this.isActiveChat = true;
        this.personalmessages.push(data);
        //  this.getSpecificMessages();
      }
      console.log(this.personalmessages.length);
    });

    this.socket.on('rtc-manager', message => {
      if (message.caller === this.user.username || message.calle === this.user.username) {
        switch (message.type) {
          case 'offer' && this.user.username === message.calle:

            break;
          case 'answer':

            break;
          case 'candidate':

            break;
          case 'leave':

            break;

        }
      }
    });
  }



  sendMessage() {

    const body = {
      sender_id: this.user._id,
      receiver_id: this.receiver_id,
      content: this.msg
    };
    this.socket.emit('private chat', body);
    this.msg = '';
    //  return;
    this.messageService.Add(body).subscribe(result => {
      this.socket.emit('private chat', { sender: this.user.username, receiver: this.receivername });
    });
    this.msg = '';
  }


  getSpecificMessages() {
    this.messageService.GetSpecificAll(this.user._id, this.receiver_id).subscribe(result => {
      if (result.error === '0') {
        this.personalmessages = result.messages;
      }
    });
  }

  sendfromnow(date) {
    return moment(date).fromNow();
  }

  toggleChat() {
    this.isShowChat = !this.isShowChat;
    console.log(this.isShowChat);
  }
  close() {
    this.isActiveChat = false;
  }
}
