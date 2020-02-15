import { Component, OnInit, ViewChild } from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {AppComponent} from "../app.component";
import { Observable, merge, concat, forkJoin, Subject } from 'rxjs';
import { Dish } from '../_models/dish';
import { DishesRepository } from '../_services/dishes-repository.service';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSelectionList, {static: true})
  private selectionList: MatSelectionList;
  public loading = false;
  public user = new User();
  private dishes: Subject<Dish[]> = new Subject<Dish[]>();
  public dishes$: Observable<Dish[]>;
  public typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private userService: UserService,
              private dishesRepository: DishesRepository,
              private app: AppComponent) {
    this.dishes$ = this.dishes.asObservable();
  }

  ngOnInit() {
      this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
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
