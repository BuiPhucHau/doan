import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
  // Observables for state management
  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');
  user: User = <User>{};

  dish$ = this.store.select('dish', 'dishList');
  dishList: Dish[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<{
      dish: DishState;
      auth: AuthState;
      user: UserState;
    }>
  ) {
    // Dispatch action to get featured dishes
    this.store.dispatch(DishActions.get({ featured: true }));

    // Subscribe to dish list observable
    this.subscriptions.push(
      this.dish$.subscribe((dishList) => {
        if (dishList.length > 0) {
          console.log(dishList);
          this.dishList = dishList;
        }
      })
    );
  }

  // Lifecycle hook to initialize the component
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

  // Lifecycle hook to clean up subscriptions
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  // Method to navigate to the booking page
  tablebooking() {
    this.router.navigate(['base/booking']);
  }

  // Method to navigate to the home page
  home() {
    this.router.navigate(['base/home']);
  }

  // Method to navigate back to the menu page
  goBack() {
    this.router.navigate(['base/menu']);
  }

  // Method to navigate back to the location page
  Back(): void {
    this.router.navigate(['/base/location']);
  }

  // Method to navigate to the new page
  new() {
    this.router.navigate(['base/new']);
  }

  // Method to navigate to the order page
  order() {
    this.router.navigate(['base/order']);
  }

  // Method to navigate to the contact page
  contact() {
    this.router.navigate(['base/contact']);
  }
}
