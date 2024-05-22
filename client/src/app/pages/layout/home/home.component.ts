import { Component, OnDestroy } from '@angular/core';
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../ngrx/state/dish.state';
import { AuthState } from '../../../ngrx/state/auth.state';
import { UserState } from '../../../ngrx/state/user.state';
import { User } from '../../../models/user.model';
import * as DishActions from '../../../ngrx/actions/dish.actions';
import { Dish } from '../../../models/dish.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home', 
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnDestroy{


  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');
  user: User = <User>{};

  dish$ = this.store.select('dish', 'dishList');
  dishList: Dish[] = [];

  subscriptions: Subscription[] = [];
  
  constructor (private router: Router,
    private store: Store<{
      dish: DishState;
      auth: AuthState;
      user: UserState;

    }>,
  ) {
    this.store.dispatch(DishActions.get({ featured: true }));

    this.subscriptions.push(
      this.dish$.subscribe((dishList) => {
        if (dishList.length>0) { 
          console.log(dishList);
          this.dishList = dishList
        } 
    }),
  );
  }

  ngOnInit() {
    this.store.dispatch(DishActions.get({ featured: true }));

    this.subscriptions.push(
      this.dish$.subscribe((dishList) => {
        if (dishList.length > 0) {
          console.log(dishList);
          this.dishList = dishList;
        }
      })
    );
  }

  // Hàm này được gọi khi component bị hủy
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }


  tablebooking() {
    this.router.navigate(['base/booking']);
  }

home() {
    this.router.navigate(['base/home']);
  }
  goBack() {
    this.router.navigate(['base/menu']);
  }
  Back(): void {
    this.router.navigate(['/base/location']);
  }
  new() {
    this.router.navigate(['base/new']);
  }
  order() {
    this.router.navigate(['base/order']);
  }
  contact() {
    this.router.navigate(['base/contact']);
  }
}
