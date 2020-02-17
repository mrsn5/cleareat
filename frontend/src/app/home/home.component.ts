import { Component, OnInit, ViewChild } from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {AppComponent} from "../app.component";
import { Observable, merge, concat, forkJoin, Subject, BehaviorSubject } from 'rxjs';
import { Dish } from '../_models/dish';
import { DishesRepository } from '../_services/dishes-repository.service';
import { MatSelectionList, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';
import { DishCategory } from '../_models/dish-category';
import { FilterState } from '../_models/filter-state';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSelectionList, {static: true})
  private selectionList: MatSelectionList;
  public loading = false;
  public user: User;
  private dishes: Subject<Dish[]> = new Subject<Dish[]>();
  public categories: DishCategory[] = []
  private filterState: BehaviorSubject<FilterState> = new BehaviorSubject(new FilterState());
  public dishes$: Observable<Dish[]>;
  public typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
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
      this.categories = dishes.map(d => d.categories).reduce((c1, c2) => c1.concat(c2));
    });
    this.filterState
    .pipe(
      skip(1)
    )
    .subscribe(st => {
      this.dishesRepository.get(st).subscribe(dishes => this.dishes.next(dishes));
    });

  }
  categoriesChanged(change: MatSelectionListChange) {
    const prevState = this.filterState.value;
    const option = change.option;
    const prevCats = prevState.categories;
    const nextprevCats = option.selected ? [...prevCats, option.value] : prevCats.filter(_ => _ !== option.value);
    this.filterState.next({...prevState, categories : nextprevCats})
  }
}
