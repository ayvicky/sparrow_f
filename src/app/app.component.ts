import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import io from 'socket.io-client';

import { FriendService, TokenService } from './services';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'socal-funda';
  socketHost;
  socket;

  friends = [];
  messages = [];
  notifications = [];
  storyForm;

  isActiveChat = false;

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

  constructor(private friendService: FriendService,
    private tokenService: TokenService, private authService: AuthService, private router: Router) {
    this.socketHost = 'http://localhost:8080';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {
    const token = this.tokenService.get();
    if (token) {
    //  this.router.navigate(['users']);
      console.log('navigate to users');
    } else {
      this.router.navigate([]);
    }

    this.friendService.getAll().subscribe(data => {
      console.log(data);
    });
  }

  signout() {
    this.authService.signout().subscribe(data => {
      console.log(data);
      this.tokenService.delete();
      this.router.navigate(['/']);
    });

  }


  close(){
    this.isActiveChat = false;
  }
}
