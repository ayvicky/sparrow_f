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


    this.socket.on('rtc-manager', data => {
      switch (data.type) {
        case 'login':

          break;
        case 'offer':
            this.handleOffer(data);
          break;
        case 'answer':
            this.handleAnswer(data);
          break;
        case 'candidate':
            this.handleCandidate(data);
          break;
        case 'leave':
            this.handleLeave();
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

  setupRtc() {

  }

  onVideo() {
    console.log('video calling');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(myStream => {
      this.stream = myStream;
      //            video.src = stream;
      if ('srcObject' in this.localVideo) {
        this.localVideo.srcObject = this.stream;
      } else {
        // Avoid using this in new browsers, as it is going away.
        this.localVideo.src = URL.createObjectURL(this.stream);
      }



      this.yourConn = new webkitRTCPeerConnection(this.configuration);

      // setup stream listening 
      this.yourConn.addStream(this.stream);

      //when a remote user adds stream to the peer connection, we display it 
      this.yourConn.onaddstream = function (e) {
        this.remoteVideo.src = window.URL.createObjectURL(e.stream);
      };

      // Setup ice handling 
      this.yourConn.onicecandidate = function (event) {

        if (event.candidate) {
          this.socket.emit('rtc-manager', {
            type: 'candidate',
            caller: this.user.username,
            calle: 'designer',
            data: event.candidate
          });
        }

      };

      // create an offer 
      this.yourConn.createOffer(function (offer) {
        this.socket.emit('rtc-manager', {
          type: 'offer',
          caller: this.user.username,
          calle: 'designer',
          data: offer
        });

        this.yourConn.setLocalDescription(offer);
      }, function (error) {
        alert("Error when creating an offer");
      });


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


  //when somebody sends us an offer 
  handleOffer(offer) {
    this.yourConn.setRemoteDescription(new RTCSessionDescription(offer.data));

    //create an answer to an offer 
    this.yourConn.createAnswer(function (answer) {
      this.yourConn.setLocalDescription(answer);

      this.socket.emit('rtc-manager', {
        type: 'answer',
        caller: this.user.username,
        calle: 'designer',
        data: answer
      });

    }, function (error) {
      alert("Error when creating an answer");
    });
  };

  //when we got an answer from a remote user
  handleAnswer(answer) {
    this.yourConn.setRemoteDescription(new RTCSessionDescription(answer.data));
  };

  //when we got an ice candidate from a remote user 
  handleCandidate(candidate) {
    this.yourConn.addIceCandidate(new RTCIceCandidate(candidate.data));
  };

  //hang up 
  hangUp() {

    this.socket.emit('rtc-manager', {
      type: 'leave',
      caller: this.user.username,
      calle: 'designer',
      data: ''
    });

    this.handleLeave();
  };

  handleLeave() {
    this.remoteVideo.src = null;

    this.yourConn.close();
    this.yourConn.onicecandidate = null;
    this.yourConn.onaddstream = null;
  };



}
