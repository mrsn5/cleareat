import { Component } from '@angular/core';
import {User} from "./_models/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "./_services/authentication.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'caprezzy';

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  isAdmin() {
    return this.currentUser ? this.currentUser.role == 'admin' : false;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
