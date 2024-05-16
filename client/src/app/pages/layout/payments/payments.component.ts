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
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
    orderid: number = 0;
  constructor(private router: Router,
    private cartService: CartService,
    private dishService: DishService,
    private route: ActivatedRoute,
    private store: Store<{
      dish: DishState;
      auth: AuthState;
      user: UserState;
      category: categoryState;
    }>,
  ) {
    

  }
  items = this.cartService.getSelectedDishes();

  ngOnInit(): void {
    this.orderid = this.generateRandomOrderId(); // Gọi hàm generateRandomOrderId() ở đây để tạo Order ID khi component được khởi tạo
  }

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

  private generateRandomOrderId(): number {
    return Math.floor(Math.random() * 9999) + 1;
  }
}
