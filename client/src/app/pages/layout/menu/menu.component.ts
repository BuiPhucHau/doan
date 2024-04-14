import { Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../ngrx/state/dish.state';
import { AuthState } from '../../../ngrx/state/auth.state';
import { UserState } from '../../../ngrx/state/user.state';
import { User } from '../../../models/user.model';
import * as UserActions from '../../../ngrx/actions/user.actions';
import * as DishActions from '../../../ngrx/actions/dish.actions';
import { Dish } from '../../../models/dish.model';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TaigaModule,ShareModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss', 
})
export class MenuComponent {
  index = 0;

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
    this.store.dispatch(DishActions.get({}));

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
  this.store.dispatch(DishActions.get({}));
    this.subscriptions.push(
      this.dish$.subscribe((dishList) => {
        if(dishList.length>0) {
          console.log(dishList);
          this.dishList = dishList;
        }
      }
    )
  );

}
ngOnDestroy() {
  this.subscriptions.forEach((subscription) => { subscription.unsubscribe();

  });
}

}
