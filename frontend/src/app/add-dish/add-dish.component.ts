import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Dish} from "../_models/dish";
import {DishesRepository} from "../_services/dishes-repository.service";
import {DishIngredient} from "../_models/dish-ingredient";
import {Ingredient} from "../_models/ingredient";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {

  dish = new Dish();
  error: any;
  loading = false;
  newIngredient = new Ingredient();
  newQuantity = 0;
  file;

  constructor(private dishService: DishesRepository,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

  }

  addDish() {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('dish', JSON.stringify(this.dish));
    this.dishService.postDish(formData).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  delete(row: DishIngredient) {
    var removeIndex = this.dish.dishIngredients.indexOf(row);
    this.dish.dishIngredients.splice(removeIndex, 1);
    console.log(this.dish.dishIngredients);
  }

  add(row: DishIngredient) {

  }

  fileChange(event) {
    if (event.target.files.length > 0) {
        this.file = event.target.files[0];
    }
  }
}
