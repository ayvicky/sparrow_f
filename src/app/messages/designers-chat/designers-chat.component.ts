import { Component, OnInit } from '@angular/core';

import { CaretEvent, EmojiEvent } from 'ng2-emoji-picker';
import io from 'socket.io-client';

import * as moment from  'moment';

import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-designers-chat',
  templateUrl: './designers-chat.component.html',
  styleUrls: ['./designers-chat.component.css']
})
export class DesignersChatComponent implements OnInit {

  messages = [{
    sender: 'A',
    message: 'Welcome',
    time: '1234566'
  }];
  message: string;

  public eventMock;
  public eventPosMock;

  public direction = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : (Math.random() > 0.5 ? 'right' : 'left');
  public toggled = false;
  public content = ' ';

  private _lastCaretEvent: CaretEvent;


  socket: any;
  user: any;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.socket = io('http://localhost:8080/developers');
    this.user = this.tokenService.GetPayload();

    this.socket.on('chat message', data => {
      console.log('receive message');
      this.messages.push(data);
      this.messages.forEach(msg => {
        console.log(msg);
      });
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
