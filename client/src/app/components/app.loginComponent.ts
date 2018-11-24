import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: '../views/app.loginComponent.html',
    styleUrls: [ '../styles/app.loginComponent.css' ]
})
export class LoginComponent {
  user: User;
  loading = false;
  loginUrl: String = '/admin';
  loginForm = new FormGroup ({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  login(username: string, password: string) {
    console.log(this.loginForm)
    console.log(username, password)
    this.loading = true;
    this.authenticationService.login(username, password)
      .subscribe(data => {
        console.log("success");
        this.router.navigate([this.loginUrl]);
      },
    error => {
      this.loading = false;
      console.log("fail")
    });
  }
}