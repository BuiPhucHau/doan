import { Component } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../ngrx/state/dish.state';
import { categoryState } from '../../../ngrx/state/category.state';
import { AuthState } from '../../../ngrx/state/auth.state';
import { UserState } from '../../../ngrx/state/user.state';
import { User } from '../../../models/user.model';
import * as UserActions from '../../../ngrx/actions/user.actions';
import * as DishActions from '../../../ngrx/actions/dish.actions';
import * as CategoryActions from '../../../ngrx/actions/category.actions';
import { Dish } from '../../../models/dish.model';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../../models/category.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DishService } from '../../../service/dish/dish.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../service/cart/cart.service';
import { TableService } from '../../../service/table/table.service';
import { ReservationService } from '../../../service/reservation/reservation.service';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TaigaModule,FontAwesomeModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.less',
})
export class OrderComponent {
  readonly testForm = new FormGroup({
    testValue: new FormControl(),
    
  });

  index = 0;
  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');
  user: User = <User>{};
  dish$ = this.store.select('dish', 'dishList');
  category$ = this.store.select('category', 'categories');
  dishList: Dish[] = [];
  categories: Category[] = [];
  dishes: Dish = <Dish>{};
  // selectDishOrder: any;

  readonly control = new FormControl('', Validators.minLength(12));
  subscriptions: Subscription[] = [];

  constructor(private router: Router,
    private cartService: CartService,
    private dishService: DishService,
    private tableService: TableService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private store: Store<{
      dish: DishState;
      auth: AuthState;
      user: UserState;
      category: categoryState;
    }>,
  ) {
   
    this.store.dispatch(DishActions.get({}));
    this.store.dispatch(CategoryActions.get());
    this.subscriptions.push(
      this.dish$.subscribe((dishList) => {
        if (dishList.length > 0) {
          console.log(dishList);
          this.dishList = dishList
        }

      }),
      this.category$.subscribe((categories) => {
        if (categories && categories.length > 0) {
          console.log(categories);
          this.categories = categories;
        }
      }),
    );
    // const dishId = this.route.snapshot.paramMap.get('dId');
    // if (dishId) {
    //   this.dishService.getDishById(dishId).subscribe((dish: any) => {
    //     this.selectDishOrder = dish;
    //   });
    // }
  }
  itemsTable= this.reservationService.getItemTable();
  
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
  clearCart(): void {
    this.cartService.clearCart();
    this.items = this.cartService.getSelectedDishes();
  }
  removeFromCart(dId: string): void {
    this.cartService.removeFromCart(dId);
    this.items = this.cartService.getSelectedDishes();
  }
  

  ngOnInit() {
    this.store.dispatch(DishActions.get({}));
    this.store.dispatch(CategoryActions.get());
    this.subscriptions.push(
      this.dish$.subscribe((dishList) => {
        if (dishList.length > 0) {
          console.log(dishList);
          this.dishList = dishList;
        }
      }),
      this.category$.subscribe((categories) => {
        if (categories && categories.length > 0) {
          console.log(categories);
          this.categories = categories;
        }
      }),
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();

    });
  }
  goBack() {
    this.router.navigate(['base/menu']);
  }
  pay() {
    this.router.navigate(['base/payments']);
  }
  order() {
    this.router.navigate(['base/order']);
  }
}
