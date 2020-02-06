import { Component, OnInit } from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {first} from "rxjs/operators";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  user = new User();

  constructor(private userService: UserService,
              private app: AppComponent) { }

  ngOnInit() {
    this.loading = true;
    this.userService.get(this.app.currentUser.uid).subscribe(user => {
      this.user = user
    });
  }

}
