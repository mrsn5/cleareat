import {Component, Input, OnInit} from '@angular/core';
import {Order, OrderState, PaymentState} from "../../../_models/order";

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
    if (this.isPaid()) return "оплачено";
    if (this.order.paymentState == PaymentState.partPaid) return "оплачено частково: " + this.order.paid + " грн";
    if (this.order.paymentState == PaymentState.notPaid) return "неоплачено";
  }






  isPaid() {
    return this.order.paymentState == PaymentState.fullyPaid;
  }

  canBeCancelled() {
    return this.order.orderState != OrderState.tookAway
  }

  canBeConfirmed() {
    return this.order.orderState == OrderState.inCheck
  }

  canBeSetInProgress() {
    return this.order.orderState == OrderState.confirmed
  }

  canBeSetReady() {
    return this.order.orderState == OrderState.inProgress
  }

  canBeDone() {
    return this.order.orderState == OrderState.ready
  }
}
