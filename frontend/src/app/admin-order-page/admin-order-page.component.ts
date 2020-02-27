import {Component, Input, OnInit} from '@angular/core';
import {Order, OrderState} from "../_models/order";
import {OrderService} from "../_services/order.service";
import {PageFilter} from "../_models/page-filter";
import {OrderFilter} from "../_models/order-filter";

@Component({
  selector: 'app-admin-order-page',
  templateUrl: './admin-order-page.component.html',
  styleUrls: ['./admin-order-page.component.css']
})
export class AdminOrderPageComponent implements OnInit {

  public orders: Order[];
  public pageSizeOptions = [1, 2, 3, 5, 10];
  public pageFilter = new PageFilter();
  public orderFilter = new OrderFilter();
  public allOrdersCount: number;

  constructor(private orderService: OrderService) {
    this.pageFilter.page = 1;
    this.pageFilter.size = this.pageSizeOptions[0];
  }

  ngOnInit() {
    this.load();
    this.orderService.getCount(this.orderFilter).pipe().subscribe(c => this.allOrdersCount = c)
  }

  pageEvent($event) {

    this.pageFilter.size = $event.pageSize;

    console.log($event);
    console.log(this.pageFilter);
    this.load();
  }

  load() {
    this.orderService.getAll(this.orderFilter, this.pageFilter).pipe().subscribe(os => {
      this.orders = os;
      console.log(os);
    })
  }

}
