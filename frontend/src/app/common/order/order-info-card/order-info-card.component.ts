import {Component, Input, OnInit} from '@angular/core';
import {Order, OrderState, PaymentState} from "../../../_models/order";
import {OrderService} from "../../../_services/order.service";

@Component({
  selector: 'app-order-info-card',
  templateUrl: './order-info-card.component.html',
  styleUrls: ['./order-info-card.component.css']
})
export class OrderInfoCardComponent implements OnInit {

  @Input() public order: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  getPaymentState() {
    if (this.isPaid()) return "оплачено";
    if (this.order.paymentState == PaymentState.partPaid) return "оплачено частково: " + this.order.paid + " грн";
    if (this.order.paymentState == PaymentState.notPaid) return "неоплачено";
  }




  update(newOrder) {
    console.log('updating ' + newOrder);
    this.orderService.updateState(newOrder).pipe().subscribe(o => this.order = o);
  }


  //update order state
  updateState(state: OrderState) {
    this.update({uid: this.order.uid, orderState: state});
  }

  confirm() {
    this.updateState(OrderState.confirmed);
  }

  cooking() {
    this.updateState(OrderState.inProgress);
  }

  ready() {
    this.updateState(OrderState.ready);
  }

  done() {
    this.updateState(OrderState.tookAway);
  }

  cancel() {
    this.updateState(OrderState.cancelled);
  }


  

  // buttons visibility
  canBeCancelled() {
    return this.order.orderState != OrderState.tookAway && this.order.orderState != OrderState.cancelled
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

  //helper methods
  isPaid() {
    return this.order.paymentState == PaymentState.fullyPaid;
  }

  getStatus() {
    switch (this.order.orderState) {
      case OrderState.cancelled:
        return "Відмінено";
      case OrderState.confirmed:
        return "Підтвердженно";
      case OrderState.inCheck:
        return "Очікує підтвердження";
      case OrderState.inProgress:
        return "Готується";
      case OrderState.ready:
        return "Готово";
      case OrderState.tookAway:
        return "Закрито";
    }
  }
}
