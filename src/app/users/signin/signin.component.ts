import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user';
import { AuthService, TokenService } from '../../services';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  errorMsg = '';

  constructor(private authService: AuthService, private tokenService: TokenService,  private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.Login(this.loginForm.value).subscribe(data => {
      console.log(data);
      if(data.error == 1){
          console.log(data.message);
          this.errorMsg = data.message;
      }else{
        const token = data.token;
        console.log(token);
        this.tokenService.set(token);
//        localStorage.setItem('ACCESS_TOKEN', token);
        this.router.navigateByUrl('/users');
      }
    });
  }

  reset(){
    this.loginForm.value.reset();
  }

}
