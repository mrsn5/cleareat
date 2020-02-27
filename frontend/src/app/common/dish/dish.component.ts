import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiClientService } from '../../_services/api-client.service';
import { Dish } from '../../_models/dish';

@Component({
    selector: 'dish',
    templateUrl: './dish.component.html',
    styleUrls: ['./dish.component.css']
  })
export class DishComponent {
    @Input() public dish: Dish;
    @Input() public canOrder: boolean = true;
    @Input() public ordered: number = 0;
    @Output() public readonly orderedChange: EventEmitter<number> = new EventEmitter<number>();
    public get unit() {
      return this.dish.categories.some(c => c.uid === 4) ?
      'мл' :
      'гр';
    }

    public get contents() {
      return this.dish.dishIngredients.map(i => i.ingredient.name.toLowerCase()).join(', ');
    }
    
    public get categories() {
      return this.dish
            .categories.map(i => i.name.toLowerCase()).join(', ');
    }
}
