import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Dish} from "../../../_models/dish";
import {DishesRepository} from "../../../_services/dishes-repository.service";
import {DishIngredient} from "../../../_models/dish-ingredient";
import {Ingredient} from "../../../_models/ingredient";
import {DishCategory} from "../../../_models/dish-category";
import {NgForm} from "@angular/forms";

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
  allCategories = [];
  newCategory = new DishCategory();
  filename: "Choose file";
  success: any;


  constructor(private dishService: DishesRepository) {}

  ngOnInit() {
    this.reloadCategories()
  }

  addDish(f: NgForm) {
    console.log(this.dish)
    this.success = null;
    this.error = null;
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('dish', JSON.stringify(this.dish));
    this.loading = true;
    this.dishService.postDish(formData).subscribe(
      result => {
        console.log(result);
        this.success = "Страва " + result.name + " додана успішно!";
        this.dish = new Dish();
        this.file = null;
        f.resetForm()
        this.loading = false;
      }, error => {
        this.error = error
        this.loading = false;
      }
    );
  }

  delete(row: DishIngredient) {
    var removeIndex = this.dish.dishIngredients.indexOf(row);
    this.dish.dishIngredients.splice(removeIndex, 1);
    console.log(this.dish.dishIngredients);
  }


  fileChange(event) {
    if (event.target.files.length > 0) {
        this.file = event.target.files[0];
        this.filename = this.file.name
    }
  }

  addIngredient() {
    if (this.newIngredient.name
      && this.newIngredient.name.trim() != ''
      && this.newQuantity != 0
    )
    {
      this.dish.dishIngredients.push({
        quantity: this.newQuantity,
        ingredient: this.newIngredient
      });
      this.newIngredient = new Ingredient();
      this.newQuantity = 0;
    }

  }

  deleteCategory(dc: DishCategory) {
    var removeIndex = this.dish.categories.indexOf(dc);
    this.dish.categories.splice(removeIndex, 1);
    console.log(this.dish.categories);
  }

  addCategory() {
    if (this.dish.categories.indexOf(this.newCategory) == -1 && this.newCategory.name)
      this.dish.categories.push(this.newCategory);
      console.log(this.dish.categories);
    this.newCategory = new DishCategory()
  }

  reloadCategories() {
    console.log('reload')
    this.dishService.getCategories().subscribe(data => {
      this.allCategories = data;
      this.newCategory= data[0];
    })
  }
}
