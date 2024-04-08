import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../ngrx/state/dish.state';
import { AuthState } from '../../../ngrx/state/auth.state';
import { UserState } from '../../../ngrx/state/user.state';
import { User } from '../../../models/user.model';
import * as UserActions from '../../../ngrx/actions/user.actions';

@Component({
  selector: 'app-home', 
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');

  user: User = <User>{};

  constructor (private router: Router,
    private store: Store<{
      dish: DishState;
      auth: AuthState;
      user: UserState;
      // reservation: ReservationState;

    }>,
  ) {



    this.user$.subscribe((user) => {
      if (user._id != null && user._id != undefined) {
        this.user = user;

        const userAsJson = JSON.stringify(user);
        // Lưu đối tượng userAsJson vào sessionStorage
        sessionStorage.setItem('user', userAsJson);
        console.log('Lưu vào sessionStorage');
      } else {
        
        // Lấy đối tượng user từ sessionStorage
        const userAsJson = sessionStorage.getItem('user');
        // Chuyển đổi chuỗi sang đối tượng user
        this.user = JSON.parse(userAsJson || '');
        this.store.dispatch(UserActions.storedUser(this.user));
      }
    });

  }



  tablebooking() {
    this.router.navigate(['base/booking']);
  }
}
