import {Component, Input, OnInit} from '@angular/core';
import {Order, PaymentState} from "../../../_models/order";

@Component({
  selector: 'app-order-info-card',
  templateUrl: './order-info-card.component.html',
  styleUrls: ['./order-info-card.component.css']
})
export class OrderInfoCardComponent implements OnInit {

  @Input() public order: Order;

  constructor() { }

  ngOnInit() {
    console.log(this.order)
  }

  getPaymentState() {
    if (this.order.paymentState == PaymentState.fullyPaid) return "оплачено";
    if (this.order.paymentState == PaymentState.partPaid) return "оплачено частково: " + this.order.paid + " грн";
    if (this.order.paymentState == PaymentState.notPaid) return "неоплачено";
  }

  getClientName() {
    if (this.order.client) return this.order.client.fullName;
  }

  getClientPhone() {
    if (this.order.client) return this.order.client.phone;
  }

}
