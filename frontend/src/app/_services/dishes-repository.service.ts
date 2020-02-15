import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../_models/user";
import { ApiClientService } from './api-client.service';
import { Dish } from '../_models/dish';
import { FilterState } from '../_models/filter-state';

@Injectable({ providedIn: 'root' })
export class DishesRepository {

  constructor(private apiClient: ApiClientService) { }

  public get(filterState?: FilterState): Observable<Dish[]> {
    const path = `api/dish`;
    let query = '';
    if (filterState) {
      query += filterState.categories.map(c => `categoryIn=${encodeURI(c)}`).join('$');
    }
    const fullUrl = query ? `${path}?${query}` : path;
    return this.apiClient.get<Dish[]>(fullUrl);

  }

}
