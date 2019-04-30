import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import io from 'socket.io-client';

import { FriendService, TokenService } from './services';


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

  constructor(private fb: FormBuilder, private friendService: FriendService,
    private tokenService: TokenService, private router: Router) {
    this.socketHost = 'http://localhost:8080';
    this.socket = io(this.socketHost);

  }

  ngOnInit() {
    const token = this.tokenService.get();
    if (token) {
      this.router.navigate(['users']);
    } else {
      this.router.navigate([]);
    }
    this.storyForm = new FormGroup({

    });

    this.friendService.getAll().subscribe(data => {
      console.log(data);
    });
  }
}
