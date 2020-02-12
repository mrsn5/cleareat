import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../_services/api-client.service';
import { Dish } from '../_models/dish';

@Component({
    selector: 'dish',
    templateUrl: './dish.component.html',
    styleUrls: ['./dish.component.css']
  })
export class DishComponent {
    @Input() public dish: Dish;

}
