import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../ngrx/state/dish.state';
import { AuthState } from '../../../ngrx/state/auth.state';
import { UserState } from '../../../ngrx/state/user.state';
import { categoryState } from '../../../ngrx/state/category.state';
import { User } from '../../../models/user.model';
import * as UserActions from '../../../ngrx/actions/user.actions';
import * as DishActions from '../../../ngrx/actions/dish.actions';
import * as CategoryActions from '../../../ngrx/actions/category.actions';
import { Dish } from '../../../models/dish.model';
import { Category } from '../../../models/category.model';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../service/cart/cart.service';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  index = 0;

  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');
  user: User = <User>{};

  dish$ = this.store.select('dish', 'dishList');
  category$ = this.store.select('category', 'categories');

  dishList: Dish[] = [];
  categories: Category[] = [];
  subscriptions: Subscription[] = [];
  //testValue = new FormControl();
  filteredDishes: any[] = [];
  selectDish : any;
  selectedDish: FormControl = new FormControl();
  branch = [
    'Food can be taken home',
    'Food cannot be taken home',

  ];

  namedishs = [
    { nameCategory : 'All', isActice : true},
    { nameCategory : 'Appetizer', isActice : false},
    { nameCategory : 'Main dishes', isActice : false},
    { nameCategory : 'Desserts', isActice : false},
  ];
  toggleActive(namedish : any)
  {
    namedish.isActice = !namedish.isActice;
  }

  ;
  constructor(private router: Router,
    private cartService: CartService,
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

  }

  ngOnInit() : void {
    this.store.dispatch(DishActions.get({}));
    this.subscriptions.push(
      this.dish$.subscribe((dishList) => {
        if (dishList.length > 0) {
          console.log(dishList);
          this.dishList = dishList;
          this.filterDishes('All');
        }
      }
      ),
      this.category$.subscribe((categories) => {
        if (categories && categories.length > 0) {
          console.log(categories);
          this.categories = categories;
        }

      }),
      this.selectedDish.valueChanges.subscribe((value: string) => {
        this.filterDishes(value);
      }),
    );
  }

  filterDishes(nameCategory: string): void {
    this.namedishs.forEach((p) => (p.isActice = p.nameCategory === nameCategory));
    if(nameCategory === 'All') {
    this.filteredDishes = [...this.dishList];
  }
  else {
    this.filteredDishes = this.dishList.filter((dish) => dish.category.nameCategory === nameCategory);
  }
  }
  showDetail(dishCart : Dish) {
    this.cartService.addToDetail(dishCart);
    this.router.navigate(['base/menu/dish-detail']);
  }
  addtoCart(dishCart : Dish): void {
    this.cartService.addToCart(dishCart);
    console.log(this.cartService.getSelectedDishes());
    this.router.navigate(['/base/order']);
  }
  ngOnDestroy() {
  this.subscriptions.forEach((subscription) => {
    subscription.unsubscribe();

  });
}

}
