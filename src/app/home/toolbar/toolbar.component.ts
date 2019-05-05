import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import io from 'socket.io-client';
import * as moment from 'moment';
import _ from 'lodash';

import { FriendService, MessageService, AuthService, TokenService } from '../../services';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  socketHost;
  socket;

  // toolbar meta vars
  friendRequests = [];
  chatList = [];
  notifications = [];

  requestsNumber = 0;
  msgNumber = 0;

  users = [
    {
      name: 'ab'
    },
    {
      name: 'ab1'
    },
    {
      name: 'ab2'
    }
  ];

  user: any;

  constructor(private router: Router,
    private friendService: FriendService,
    private messageService: MessageService,
    private authService: AuthService,
    private tokenService: TokenService) {
    this.socketHost = 'http://localhost:8080';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.getAllFriends();
    this.getAllMessages();

    this.socket.on('private chat message', data => {
      console.log('private message receive, toolbar');
      //  if (data.receiver === this.user.username) {
      this.getAllMessages();
      //  }
    });
  }


  getAllFriends() {
    this.friendService.getAll().subscribe(result => {

      // if current user is receiver and status is 0 show in list
      this.friendRequests = result.users;
      this.CheckFriendRequest(this.friendRequests);
    });
  }


  getAllMessages() {
    this.messageService.GetAll().subscribe(result => {
      console.log(result);
      if (result.error == 0) {
        this.chatList = result.messages;
        this.CheckIfRead(this.chatList);
      }
    });
  }

  // check if any request received
  CheckFriendRequest(arr){
    const checkArr = [];
    for(let i = 0; i< arr.length; i++){
      const user = arr[i];

      if(user.timeline === '0' && user.receiver_id === this.user._id){
        checkArr.push(1);
        this.requestsNumber = _.sum(checkArr);
      }
    }
  }

  // if message read
  CheckIfRead(arr) {
    const checkArr = [];
    for (let i = 0; i < arr.length; i++) {
      const message = arr[i];
      //  const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];
      //  if (this.router.url !== `/chat/${receiver.sendername}`) {
      if (message.is_read === '0' && message.receiver_id === this.user._id) {
        checkArr.push(1);
        this.msgNumber = _.sum(checkArr);
      }
      //  }
    }
    console.log(this.msgNumber);
  }


  // Message date
  MessageDate(date) {
    return moment(date).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[DD/MM/YYYY',
      sameElse: '[DD/MM/YYYY',
    });
  }


  // Signout user
  signout() {
    this.authService.signout().subscribe(data => {
      console.log(data);
      this.tokenService.delete();
      this.router.navigate(['/']);
    });
  }

}
