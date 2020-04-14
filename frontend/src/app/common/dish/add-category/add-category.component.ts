import { Component, OnInit } from '@angular/core';
import {DishCategory} from "../../../_models/dish-category";
import {DishesRepository} from "../../../_services/dishes-repository.service";
import {FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = new DishCategory();
  loading = false;
  error: any;
  success: any;
  ff: FormGroup;

  constructor(private dishService: DishesRepository) { }

  ngOnInit() {
  }

  addCategory(f: NgForm) {
    console.log(this.category);
    this.loading = true;
    this.success = null;
    this.error = null;
    this.dishService.postCategory(this.category).subscribe(
      result => {
        console.log(result);
        this.success = "Категорія " + result.name + " додана успішно!";
        this.category = new DishCategory();
        f.resetForm()
        this.loading = false;
      }, error => {
        this.error = error
        this.loading = false;
      }
    );
    return false;
  }
}
