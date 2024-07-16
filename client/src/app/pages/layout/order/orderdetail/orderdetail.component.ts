import { Component } from '@angular/core';
import { TaigaModule } from '../../../../shared/taiga.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../../ngrx/state/dish.state';
import { categoryState } from '../../../../ngrx/state/category.state';
import { AuthState } from '../../../../ngrx/state/auth.state';
import { UserState } from '../../../../ngrx/state/user.state';
import { OrderState } from '../../../../ngrx/state/order.state';
import * as OrderActions from '../../../../ngrx/actions/order.actions';
import { User } from '../../../../models/user.model';
import * as UserActions from '../../../../ngrx/actions/user.actions';
import * as DishActions from '../../../../ngrx/actions/dish.actions';
import * as CategoryActions from '../../../../ngrx/actions/category.actions';
import { Dish } from '../../../../models/dish.model';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../../../models/category.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DishService } from '../../../../service/dish/dish.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../service/cart/cart.service';
import { TableService } from '../../../../service/table/table.service';
import { ReservationService } from '../../../../service/reservation/reservation.service';
import { Order } from '../../../../models/order.model';


@Component({
  selector: 'app-orderdetail',
  standalone: true,
  imports: [TaigaModule, ReactiveFormsModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './orderdetail.component.html',
  styleUrl: './orderdetail.component.scss'
})
export class OrderdetailComponent {
  order$ = this.store.select('order', 'orderList');
  orderList: Order[] = [];
  orders: Order = <Order>{};
  constructor(
    private router: Router,
    private store: Store<{
      order: OrderState,
      dish: DishState,
      category: categoryState,
      auth: AuthState,
      user: UserState
    }>
  ) {
    this.store.dispatch(OrderActions.get());
    this.order$.subscribe((orderList) => {
      if (orderList.length > 0) {
        console.log(orderList);
        this.orderList = orderList;
      }
    }
    );
  }

  ngOnInit() {
    this.store.dispatch(OrderActions.get());
    this.order$.subscribe((orderList) => {
      if (orderList.length > 0) {
        console.log(orderList);
        this.orderList = orderList;
      }
    }
    );
  }
  
}


