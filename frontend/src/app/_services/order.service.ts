import {Injectable} from "@angular/core";
import {Order} from "../_models/order";
import {OrderFilter} from "../_models/order-filter";
import {PageFilter} from "../_models/page-filter";
import {ApiClientService} from "./api-client.service";

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private apiClient: ApiClientService) { }

  getAll(orderFilter?: OrderFilter, pageFilter?: PageFilter) {
    const path = `api/order`;
    let filters: string[] = [];
    if (orderFilter && orderFilter.orderStates) {
      filters = filters.concat(orderFilter.orderStates.map(s => `orderStates=${s}`));
    }
    if (pageFilter) {
      if (pageFilter.size) filters.push(`size=${pageFilter.size}`);
      if (pageFilter.page) filters.push(`page=${pageFilter.page}`);
      if (pageFilter.sort) filters.push(`sort=${pageFilter.sort}`);
    }
    const query = filters.join('&');
    const fullUrl = query ? `${path}?${query}` : path;
    return this.apiClient.get<Order[]>(fullUrl);
  }

  get(id) {
    return this.apiClient.get<Order>(`/api/order/${id}\\`);
  }

  getCount(orderFilter?: OrderFilter) {
    const path = `api/order/count`;
    let filters: string[] = [];
    if (orderFilter && orderFilter.orderStates) {
      filters = filters.concat(orderFilter.orderStates.map(s => `orderStates=${s}`));
    }
    const query = filters.join('&');
    const fullUrl = query ? `${path}?${query}` : path;
    return this.apiClient.get<number>(fullUrl);
  }

  updateState(order: Order) {
    return this.apiClient.put<Order>(`api/order/`, order);
  }
}
