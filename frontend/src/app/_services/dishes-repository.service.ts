import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Dish } from '../_models/dish';
import { FilterState } from '../_models/filter-state';
import { DishCategory } from '../_models/dish-category';
import { Ingredient } from '../_models/ingredient';

@Injectable({ providedIn: 'root' })
export class DishesRepository {

  constructor(private apiClient: ApiClientService) { }

  public get(filterState?: FilterState): Observable<Dish[]> {
    const path = `api/dish`;
    let filters = []
    if (filterState) {
      filters = filters.concat(filterState.categories.map(c => `categoryIn=${c}`));
      filters = filters.concat(filterState.ingredients.map(c => `ingredientNotIn=${c}`));
    }
    const query = filters.join('&');
    const fullUrl = query ? `${path}?${query}` : path;
    return this.apiClient.get<Dish[]>(fullUrl);

  }

  public getCategories(): Observable<DishCategory[]> {
    const path = `api/category`;
    return this.apiClient.get<DishCategory[]>(path);
  }

  public getIngredients(): Observable<Ingredient[]> {
    const path = `api/ingredient`;
    return this.apiClient.get<Ingredient[]>(path);
  }

}
