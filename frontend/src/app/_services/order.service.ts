import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../_models/user";
import {Order} from "../_models/order";

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Order>(`${environment.apiUrl}/api/order/`);
  }

  get(id) {
    return this.http.get<Order>(`${environment.apiUrl}/api/order/${id}`);
  }
}
