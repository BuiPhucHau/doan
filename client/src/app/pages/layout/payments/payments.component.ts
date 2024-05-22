import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../ngrx/state/dish.state';
import { categoryState } from '../../../ngrx/state/category.state';
import { AuthState } from '../../../ngrx/state/auth.state';
import { UserState } from '../../../ngrx/state/user.state';
import { CartService } from '../../../service/cart/cart.service';
import { DishService } from '../../../service/dish/dish.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule,Validators } from '@angular/forms';
import * as OrderActions from '../../../ngrx/actions/order.actions';
import { OrderState } from '../../../ngrx/state/order.state';
import { ReactiveFormsModule } from '@angular/forms';
import { TableService } from '../../../service/table/table.service';
import { Table } from '../../../models/table.model';
@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  currentDate = new Date().toISOString().slice(0, 10);

  isCreateOrder$ = this.store.select('order', 'order');

  tableItems: Table = <Table>{};
  isTable = false;
  addOrderForm = new FormGroup({
      tableId: new FormControl('', Validators.required),
      orderId: new FormControl('', Validators.required),
      orderName: new FormControl('', Validators.required),
      orderPhone: new FormControl('', Validators.required),
      orderAddress: new FormControl('', Validators.required),
      orderEmail: new FormControl('', Validators.required),
      orderDate: new FormControl(this.currentDate, Validators.required),
    });
  constructor(private router: Router,
    private cartService: CartService,
    private dishService: DishService,
    private route: ActivatedRoute,
    private tableService: TableService,
    private store: Store<{
      order: OrderState;
      dish: DishState;
      auth: AuthState;
      user: UserState;
      category: categoryState;
    }>,
  ) {
    // onTableStateChange(this.store, (state) => {
    //   if(state.tableList.length > 0)
    //     {
    //       this.tableItems = {
    //         tableId: state.tableId,
    //       }
    //     }
    //   this.tableItems = state.tableList;
    // });
  }

  tableitems = this.tableService.getItemTable();
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

  generateRandomOrderId(): number {
    return Math.floor(Math.random() * 9999) + 1;
  }
  goBackOrder(){
    this.router.navigate(['base/order']);
  }
  createOrder(): void {
    const addOrderForm: any = {
      orderId: this.generateRandomOrderId(),
      orderName: this.addOrderForm.value.orderName ?? '',
      orderPhone:this.addOrderForm.value.orderPhone ?? '',
      orderAddress:this.addOrderForm.value.orderAddress ?? '',
      orderEmail:this.addOrderForm.value.orderEmail ?? '',
      orderDate:this.addOrderForm.value.orderDate ?? new Date(),
    };
    console.log('Thanh toan thanh cong', addOrderForm);
    this.store.dispatch(
      OrderActions.createOrder({ order: addOrderForm })
    );
  }
  goToPaymentMomo(){
    this.createOrder();
    this.router.navigate(['base/payments/payment-momo']);
  }
  goToPaymentBanking(){
    this.createOrder();
    this.router.navigate(['base/payments/payment-banking']);
  }
  goToPaymentCOD(){
    this.createOrder();
    this.router.navigate(['base/payments/payment-cod']);
  }

}
