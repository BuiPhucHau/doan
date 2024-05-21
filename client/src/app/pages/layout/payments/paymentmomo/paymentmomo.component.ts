import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../../ngrx/state/dish.state';
import { categoryState } from '../../../../ngrx/state/category.state';
import { AuthState } from '../../../../ngrx/state/auth.state';
import { UserState } from '../../../../ngrx/state/user.state';
import { CartService } from '../../../../service/cart/cart.service';
import { DishService } from '../../../../service/dish/dish.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormsModule,Validators } from '@angular/forms';
import * as OrderActions from '../../../../ngrx/actions/order.actions';
import { OrderState } from '../../../../ngrx/state/order.state';
import { ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../../../models/order.model';

@Component({
  selector: 'app-paymentmomo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './paymentmomo.component.html',
  styleUrl: './paymentmomo.component.scss'
})
export class PaymentmomoComponent {
  subscriptions: Subscription[] = [];
  orderList: Order[] = [];
  order$ = this.store.select('order', 'orderList');
  constructor(private router: Router,
    private cartService: CartService,
    private dishService: DishService,
    private route: ActivatedRoute,
    private store: Store<{
      order: OrderState;
      dish: DishState;
      auth: AuthState;
      user: UserState;
      category: categoryState;
    }>,
  ) {
    this.store.dispatch(OrderActions.get());
    this.subscriptions.push( 
      this.order$.subscribe((orderList) => {  
        if (orderList.length > 0) {
          console.log('orderList', orderList);
          this.orderList = orderList;
        }
      })
    );
  }
ngOnInit(){
  this.store.dispatch(OrderActions.get());
  this.subscriptions.push( 
    this.order$.subscribe((orderList) => {  
      if (orderList.length > 0) {
        console.log('orderList', orderList);
        this.orderList = orderList;
      }
    })
  );
}
  items = this.cartService.getSelectedDishes();
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

}
