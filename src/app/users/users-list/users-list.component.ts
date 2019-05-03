import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log('get all users');
    this.getUsers();
    console.log('get all users. after call');

  }

  getUsers(){
    this.userService.getUsers().subscribe( data => {
      this.users = data.users;
      console.log('get all users from db');
      console.log(this.users);
    }, err => {
      console.log('get all users error');
        console.log(err);
    });
  }

}
