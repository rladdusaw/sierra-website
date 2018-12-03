import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'logout-component',
  template: '<div></div>'
})
export class LogoutComponent implements OnInit {
  logoutUrl: String = '/';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.logout();
    this.router.navigate([this.logoutUrl]);
  }
}