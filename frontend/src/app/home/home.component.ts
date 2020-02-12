import { Component, OnInit } from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {AppComponent} from "../app.component";
import { Observable, merge, concat, forkJoin, Subject } from 'rxjs';
import { Dish } from '../_models/dish';
import { ApiClientService } from '../_services/api-client.service';
import { DishesRepository } from '../_services/dishes-repository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loading = false;
  public user = new User();
  private dishes: Subject<Dish[]> = new Subject<Dish[]>();
  public dishes$: Observable<Dish[]>;
  constructor(private userService: UserService,
              private dishesRepository: DishesRepository,
              private app: AppComponent) {
    this.dishes$ = this.dishes.asObservable();
  }

  ngOnInit() {
    this.loading = true;
    forkJoin(
      this.userService.get(this.app.currentUser.uid),
      this.dishesRepository.get()
    )
    .subscribe(([user, dishes]) => {
      this.user = user;
      this.dishes.next(dishes);
      this.loading = false;
    });
  }

}
