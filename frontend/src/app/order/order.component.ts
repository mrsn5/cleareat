import { Component, OnInit } from '@angular/core';
import { OrderStateService } from '../_services/order-state.service';
import { Dish } from '../_models/dish';
import { DishesRepository } from '../_services/dishes-repository.service';
import { forkJoin } from 'rxjs';
import { DishDisplayMode } from '../common/dish/dish.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../_services/api-client.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public displayMode = DishDisplayMode.Compact;
  public orderedDishes: Dish[] = [];
  public preferForm: FormGroup;
  // public contactsForm: FormGroup;
  constructor(
    private orderState: OrderStateService,
    private dishesRepo: DishesRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiClientService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.preferForm = this.formBuilder.group({
      prefs: ['', Validators.maxLength(150)]
    });

    // this.contactsForm = this.formBuilder.group({
    //   name: ['', Validators.maxLength(150)],
    //   email: ['', Validators.email],
    //   phone: ['', Validators.maxLength(150)],
    //   });
      forkJoin(
      this.orderState.getDishes().map(id => this.dishesRepo.getById(id))
    ).subscribe(dishes => this.orderedDishes = dishes);
  }

  public getOrdered(uid: number) : number {
    return this.orderState.getSelected(uid);
  }

  public setOrdered(uid: number, amount: number) : void {
    this.orderState.setSelected(uid, amount);
  }

  public confirm() {
    this.api.post('api/order', {
      preferences: this.preferForm.controls['prefs'].value,
      portions: this.orderState.getDishes().map(
        id => <object>{
          dish: {uid: id},
          quantity: this.orderState.getSelected(id),
          // client: this.currentUser != null ? null : {
          //   mail: this.contactsForm.controls['email'].value,
          //   phone: this.contactsForm.controls['phone'].value,
          //   fullName: this.contactsForm.controls['name'].value
          // }
        },
      )
    }).subscribe(_ => {
      this.orderState.clear();
      this.router.navigate(['/']);
    });
  }

  public get currentUser(): User {
    return this.authenticationService.currentUserValue;
  }
}
