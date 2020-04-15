import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from '../../_models/dish';
import {DishesRepository} from "../../_services/dishes-repository.service";

export enum DishDisplayMode {
  Full,
  Compact
}

@Component({
    selector: 'dish',
    templateUrl: './dish.component.html',
    styleUrls: ['./dish.component.css']
  })
export class DishComponent {
    @Input() public dish: Dish;
    @Input() public ordered: number = 0;
    @Input() public displayMode: DishDisplayMode = DishDisplayMode.Full;
    @Output() public readonly orderedChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() public readonly deleteHandler: EventEmitter<Dish> = new EventEmitter<Dish>();
    public DishDisplayMode = DishDisplayMode;

    constructor(private dishService: DishesRepository) { }

    public get unit() {
      return this.dish.categories.some(c => c.uid === 4) ?
      'мл' :
      'гр';
    }

    public get contents() {
      return this.dish.dishIngredients.map(i => i.ingredient.name.toLowerCase()).join(', ');
    }

    public get backgroundImage() {
      return `url(${this.dish.photo})`;
    }

    public get categories() {
      return '#' + this.dish
            .categories.map(i => i.name.toLowerCase()).join(' #');
    }

  delete() {
      this.dishService.delete(this.dish.uid)//.subscribe( _ => this.deleteHandler.emit(this.dish))
  }

  show() {

  }

  hide() {

  }

  edit() {

  }
}
