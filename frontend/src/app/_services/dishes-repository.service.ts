import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../_models/user";
import { ApiClientService } from './api-client.service';
import { Dish } from '../_models/dish';

@Injectable({ providedIn: 'root' })
export class DishesRepository {

  constructor(private apiClient: ApiClientService) { }

  public get(): Observable<Dish[]> {
    return this.apiClient.get<Dish[]>(`api/dish`);
  }

}
