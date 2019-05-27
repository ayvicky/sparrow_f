import { Component, OnInit, AfterViewInit } from '@angular/core';

import { CaretEvent, EmojiEvent } from 'ng2-emoji-picker';
import io from 'socket.io-client';

import * as moment from  'moment';

import { TokenService } from '../../services/token.service';
import { Global } from 'src/app/helpers/global';

@Component({
  selector: 'app-designers-chat',
  templateUrl: './designers-chat.component.html',
  styleUrls: ['./designers-chat.component.css']
})
export class DesignersChatComponent implements OnInit, AfterViewInit {

  messages = [];
  message: string;

  public eventMock;
  public eventPosMock;

  public direction = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : (Math.random() > 0.5 ? 'right' : 'left');
  public toggled = false;
  public content = ' ';

  private _lastCaretEvent: CaretEvent;


  socket: any;
  user: any;

  onlineusers: [];

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.socket = io(Global.BASEURL);
    this.user = this.tokenService.GetPayload();

    this.socket.emit('online', {room: 'designers', user: this.user.username});

    this.socket.on('chat message', data => {
      console.log('receive message');
      this.messages.push(data);
      this.messages.forEach(msg => {
        console.log(msg);
      });
    });
  }

  ngAfterViewInit(){
    this.socket.on('onlineusers', list => {
      this.onlineusers = list;
    });
  }

  HandleSelection(event: EmojiEvent) {
    this.content = this.content.slice(0, this._lastCaretEvent.caretOffset)
      + event.char +
      this.content.slice(this._lastCaretEvent.caretOffset);
    this.eventMock = JSON.stringify(event);

    this.message = this.content;

    this.toggled = !this.toggled;
    this.content = '';
  }

  HandleCurrentCaret(event: CaretEvent) {
    this._lastCaretEvent = event;
    this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${event.textContent} }`;
  }

  Toggled() {
    this.toggled = !this.toggled;
  }


  IsTyping() {

  }

  sendMessage(){
    this.socket.emit('chat message', {sender: this.user.username, message: this.message, time: Date.now()});
    this.message = '';
  }

  fromNow(date) {
    return moment(date).fromNow();
  }

}
