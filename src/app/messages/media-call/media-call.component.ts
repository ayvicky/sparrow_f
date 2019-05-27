import { Component, OnInit, AfterViewInit } from '@angular/core';
import io from 'socket.io-client';
import _ from 'lodash';

import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { TokenService } from 'src/app/services/token.service';
import { Global } from 'src/app/helpers/global';

@Component({
  selector: 'app-media-call',
  templateUrl: './media-call.component.html',
  styleUrls: ['./media-call.component.css']
})
export class MediaCallComponent implements OnInit, AfterViewInit {
  remoteVideo: any;
  localVideo: any;
  yourConn: any;
  stream: any;

  socketHost;
  socket;
  user: any;
  onlineusers = [];

  pc: any;

  constructor(private userService: UserService, private tokenService: TokenService,
    private chatService: ChatService) {
    this.socketHost = Global.BASEURL;
    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

    this.socket.on('onlineusers', data => {
      this.onlineusers = data;
    });


    this.remoteVideo = document.querySelector('#remoteVideo');
    this.localVideo = document.querySelector('#localVideo');


    this.socket.on('rtc-message', data => {
      switch (data.type) {
        case 'login':

          break;
        case 'offer':
          //  handleOffer(data);
          break;
        case 'answer':
          //  handleAnswer(data);
          break;
        case 'candidate':
          //  handleCandidate(data);
          break;
        case 'leave':
          //  handleLeave(data);
          break;
        default:
          break;
      }
    });
  }
  ngAfterViewInit() {
    // set the initial state of the video


  }

  checkifonline(username) {
    const result = _.indexOf(this.onlineusers, username);
    if (result > -1) {
      return true;
    } else {
      return false;
    }
  }

  onVideo() {
    console.log('video calling');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(myStream => {
      this.stream = myStream;

      this.localVideo.src = this.stream
    }).catch(function (e) {
      console.log('' + e);
    });
  }

  onAudio() {
    console.log('audio calling');
    navigator.mediaDevices.getUserMedia({ audio: true }).then(myStream => {
      this.stream = myStream;

      this.localVideo.src = this.stream
    }).catch(function (e) {
      console.log('' + e);
    });
  }

  onClose() {

  }

  configuration = {
    iceServers: [{
      urls: 'stun:stun.l.google.com:19302'
    }]
  };

}
