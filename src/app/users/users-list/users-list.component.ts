import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import io from 'socket.io-client';
import _ from 'lodash';


import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { TokenService } from 'src/app/services/token.service';
import { MediaCallComponent } from 'src/app/messages/media-call/media-call.component';
import { Global } from 'src/app/helpers/global';
import { CallDialogService } from 'src/app/services/call-dialog.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  socketHost;
  socket;
  user: any;
  users = [];
  onlineusers = [];
  constructor(private userService: UserService, private tokenService: TokenService,
      private chatService: ChatService, public dialog: MatDialog,
      private callDialogService: CallDialogService) {
      this.socketHost = Global.BASEURL;
      this.socket = io(this.socketHost);
     }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.getUsers();

    this.socket.on('onlineusers', data => {
      this.onlineusers = data;
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      _.remove(data.users, {username: this.user.username});
      this.users = data.users;
    }, err => {
      console.log('get all users error');
      console.log(err);
    });
  }

  checkifonline(username){
    const result = _.indexOf(this.onlineusers, username);
    if(result > -1){
      return true;
    }else{
      return false;
    }
  }


  openDialog(): void {

      this.callDialogService.showDialog();
      return;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(MediaCallComponent, dialogConfig);
    /*
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    //  this.animal = result;
    });
    */
  }


  onChat(user) {
    console.log('onChat click');
    this.chatService.chatData.emit(user);
  }

  addFriend() {

  }
  acceptFriend() {

  }
  rejectFriend() {

  }
  cancelFriend() {

  }
  removeFriend() {

  }
  blockUser() {

  }


}
