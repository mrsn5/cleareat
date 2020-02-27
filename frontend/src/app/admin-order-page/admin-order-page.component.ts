import {Component, Input, OnInit} from '@angular/core';
import {Order, OrderState} from "../_models/order";
import {OrderService} from "../_services/order.service";

@Component({
  selector: 'app-admin-order-page',
  templateUrl: './admin-order-page.component.html',
  styleUrls: ['./admin-order-page.component.css']
})
export class AdminOrderPageComponent implements OnInit {

  public orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAll({orderStates: [OrderState.inCheck]}).pipe().subscribe(os => {
      this.orders = os;
      console.log(os);
    })
  }

}
