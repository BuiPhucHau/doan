import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
import { PaymentImage } from '../../../../models/paymentimage.model';
import * as PaymentImageActions from '../../../../ngrx/actions/paymentimage.actions';
import { PaymentImageState } from '../../../../ngrx/state/paymentimage.state';
import { ShareModule } from '../../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { PaymentSuccessDialogComponent } from '../payment-success-dialog/payment-success-dialog.component';
import { ReservationService } from '../../../../service/reservation/reservation.service';
import { OrderService } from '../../../../service/order/order.service';
@Component({
  selector: 'app-paymentmomo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,ShareModule],
  templateUrl: './paymentmomo.component.html',
  styleUrl: './paymentmomo.component.scss'
})
export class PaymentmomoComponent {
  subscriptions: Subscription[] = [];
  orderList: Order[] = [];
  order$ = this.store.select('order', 'orderList');
  
  paymentImageList: PaymentImage[] = [];
  paymentimage$ = this.store.select('paymentimage', 'paymentImageList');


  constructor(private router: Router,
    private cartService: CartService,
    private dialog: MatDialog,
    private reservationService: ReservationService,
    private orderService: OrderService,
    private store: Store<{
      order: OrderState;
      dish: DishState;
      auth: AuthState;
      user: UserState;
      category: categoryState;
      paymentimage: PaymentImageState;
    }>,
  ) {
    this.store.dispatch(OrderActions.get());
    this.store.dispatch(PaymentImageActions.get());
    this.subscriptions.push( 
      this.order$.subscribe((orderList) => {  
        if (orderList.length > 0) {
          console.log('orderList', orderList);
          this.orderList = orderList;
        }
      })
    );
    this.subscriptions.push(
      this.paymentimage$.subscribe((paymentImageList) => {
        try {
          if (paymentImageList.length > 0) {
            console.log('paymentImageList', paymentImageList);
            this.paymentImageList = paymentImageList;
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    ));
  }
ngOnInit(){
  this.orderItem = this.orderService.getOrderDetail();
  this.store.dispatch(OrderActions.get());
  this.subscriptions.push( 
    this.order$.subscribe((orderList) => {  
      if (orderList.length > 0) {
        console.log('orderList', orderList);
        this.orderList = orderList;
      }
    })
  );
  this.store.dispatch(PaymentImageActions.get());
  this.subscriptions.push(
    this.paymentimage$.subscribe((paymentImageList) => {
      try {
        if (paymentImageList.length > 0) {
          console.log('paymentImageList', paymentImageList);
          this.paymentImageList = paymentImageList;
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  ));
}
  orderItem = this.orderService.getOrderDetail();
  items = this.cartService.getSelectedDishes();
  tableitems = this.reservationService.getItemTable();
  totalAmount()
  {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
  totalQuantity()
  {
    let totalQuantity = 0;
    this.items.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }  
  remoteAllCart()
  {
    this.cartService.clearCart();
    this.reservationService.clearItemTable();
  }
  checkOut()
  {
    const dialogRef = this.dialog.open(PaymentSuccessDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.remoteAllCart();
      this.router.navigate(['base/home']);
    });
  }
  goBackPayment()
  {
    this.router.navigate(['base/payments']);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
