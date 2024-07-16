import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../../ngrx/state/dish.state';
import { categoryState } from '../../../../ngrx/state/category.state';
import { AuthState } from '../../../../ngrx/state/auth.state';
import { UserState } from '../../../../ngrx/state/user.state';
import { CartService } from '../../../../service/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import * as OrderActions from '../../../../ngrx/actions/order.actions';
import { OrderState } from '../../../../ngrx/state/order.state';
import { ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../../../models/order.model';
import { ShareModule } from '../../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';

import { ReservationService } from '../../../../service/reservation/reservation.service';
import { OrderService } from '../../../../service/order/order.service';
import * as TableActions from '../../../../ngrx/actions/table.actions';
import * as ReservationActions from '../../../../ngrx/actions/reservation.actions'
import { BillService } from '../../../../service/bill/bill.service';

@Component({
  selector: 'app-paymentstripe',
  standalone: true,
  imports:  [CommonModule, FormsModule, ReactiveFormsModule, ShareModule],
  templateUrl: './paymentstripe.component.html',
  styleUrl: './paymentstripe.component.scss'
})
export class PaymentstripeComponent {
  subscriptions: Subscription[] = [];
  orderList: Order[] = [];
  order$ = this.store.select('order', 'orderList');
  bill: any;
  constructor(
    private router: Router,
    private cartService: CartService,
    private billService: BillService,
    private dialog: MatDialog,
    private reservationService: ReservationService,
    private orderService: OrderService,
    private store: Store<{
      order: OrderState;
      dish: DishState;
      auth: AuthState;
      user: UserState;
      category: categoryState;
    }>
  ) {
    // get all order 
    this.store.dispatch(OrderActions.get());
    this.subscriptions.push(
      this.order$.subscribe((orderList) => {
        if (orderList.length > 0) {
          console.log('orderList', orderList);
          this.orderList = orderList;
        }
      }),
      // get payment
  
  }
  ngOnInit() {
    this.orderItem = this.orderService.getOrderDetail();
    this.store.dispatch(OrderActions.get());
    this.subscriptions.push(
      this.order$.subscribe((orderList) => {
        if (orderList.length > 0) {
          console.log('orderList', orderList);
          this.orderList = orderList;
        }
      }),
    );
  }
  orderItem = this.orderService.getOrderDetail();
  items = this.cartService.getSelectedDishes();
  item = this.billService.getBillFromPaymentSuccess();
  // tableitems = this.reservationService.getItemTable();
  // go to paymentmomo and create bill
  paymentmomo() {
    const tableId = this.orderItem.tableId;
    const bill = {
      BillId: this.generateRandomOrderId(),
      dishList: this.items,
      TableId: tableId,
      OrderId: this.orderItem.orderId,
      Total: this.totalAmount(),
      QuantityTotal: this.totalQuantity(),
      DatePayment: new Date(),
    }
    console.log('bill', bill);
    this.store.dispatch(PaymentMomoActions.createAtConfirmPayment({ bill: bill }));
    this.billService.addBillToPaymentSuccess(bill);
    const reservationId = this.orderItem.reservationId;
    if (reservationId) {
      this.store.dispatch(ReservationActions.removeReservation({ reservationId }));
    }
    if (tableId) {
      this.store.dispatch(TableActions.checkoutTable({ tableId }));
    }
    //this.remoteAllCart();
  }
  // calculate the total amount
  totalAmount() {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
  // calculate the total quantity
  totalQuantity() {
    let totalQuantity = 0;
    this.items.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }
  // clear the cart
  remoteAllCart() {
    this.cartService.clearCart();
    // this.reservationService.clearItemTable();
  }
  // random order id
  generateRandomOrderId(): number {
    return Math.floor(Math.random() * 9999) + 1;
  }
  // go back to payment page
  goBackPayment() {
    this.router.navigate(['base/payments']);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
