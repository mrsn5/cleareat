import {Component, OnInit} from '@angular/core';
import {OrderStateService} from '../_services/order-state.service';
import {Dish} from '../_models/dish';
import {DishesRepository} from '../_services/dishes-repository.service';
import {forkJoin, of} from 'rxjs';
import {DishDisplayMode} from '../common/dish/dish.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiClientService} from '../_services/api-client.service';
import {AuthenticationService} from '../_services/authentication.service';
import {User} from '../_models/user';
import {DomSanitizer} from '@angular/platform-browser';
import {OrderService} from "../_services/order.service";
import {Order} from "../_models/order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public displayMode = DishDisplayMode.Compact;
  public orderedDishes: Dish[] = [];
  public preferForm: FormGroup;
  public loading = false;
  // public contactsForm: FormGroup;
  constructor(
    public orderState: OrderStateService,
    private dishesRepo: DishesRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiClientService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.preferForm = this.formBuilder.group({
      prefs: ['', Validators.maxLength(150)]
    });
    this.initializeDishes();
  }

  public getOrdered(uid: number): number {
    return this.orderState.getSelected(uid);
  }

  public initializeDishes() {
    if (this.orderState.getDishes().length) {
      forkJoin(
        this.orderState.getDishes().map(id => this.dishesRepo.getById(id))
      ).subscribe(dishes => this.orderedDishes = dishes);
    } else {
      this.orderedDishes = [];
    }
  }

  public setOrdered(dish: Dish, amount: number): void {
    this.orderState.setSelected(dish, amount);
    if (this.orderState.getDishes().length !== this.orderedDishes.length) {
      this.initializeDishes();
    }
  }

  public confirm(card: boolean = false) {
    if (!this.loading) {
      console.log('conf')
      this.loading = true;
      this.api.post<Order>('api/order', {
        preferences: this.preferForm.controls['prefs'].value,
        portions: this.orderState.getDishes().map(
          id => <object>{
            dish: {uid: id},
            quantity: this.orderState.getSelected(id)
          },
        )
      }).subscribe(order => {
        this.orderState.clear();
        this.router.navigate(['order/confirm/' + order.uid, {card: card}]);
      }, error => this.loading = false);
    }
  }

  public get currentUser(): User {
    return this.authenticationService.currentUserValue;
  }
}
