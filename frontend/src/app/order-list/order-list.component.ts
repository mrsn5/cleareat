import {Component, Input, OnInit} from '@angular/core';
import {Order, OrderState} from "../_models/order";
import {OrderService} from "../_services/order.service";
import {PageFilter} from "../_models/page-filter";
import {OrderFilter} from "../_models/order-filter";
import {group} from "@angular/animations";
import {forkJoin} from "rxjs";
import {Dish} from "../_models/dish";
import {UserService} from "../_services/user.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public orders: Order[];
  public pageSizeOptions = [5, 10, 25, 50, 100];
  public pageFilter = new PageFilter();
  public orderFilter = new OrderFilter();
  public allOrdersCount: number;

  constructor(private orderService: OrderService,
              private app: AppComponent) {
    this.pageFilter.page = 0;
    this.pageFilter.size = this.pageSizeOptions[0];
  }

  ngOnInit() {
    this.load();
  }

  changeStateList(source) {
    if (source.checked) {
      this.orderFilter.orderStates.push(source.value);
    } else {
      const index = this.orderFilter.orderStates.indexOf(source.value);
      if (index > -1) {
        this.orderFilter.orderStates.splice(index, 1);
      }
    }
    this.load()
  }

  pageEvent($event) {

    this.pageFilter.size = $event.pageSize;
    this.pageFilter.page = (this.pageFilter.size != $event.pageSize) ? 0 : $event.pageIndex;
    console.log($event);
    this.load();
  }

  load() {
    forkJoin(
      this.orderService.getAll(this.app.currentUser, this.orderFilter, this.pageFilter),
      this.orderService.getCount(this.app.currentUser, this.orderFilter)
    ).subscribe(([orders, count]) => {
      this.orders = orders;
      this.allOrdersCount = count
    });
  }

}
