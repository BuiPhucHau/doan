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

  index = 0;
 

  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');
  user: User = <User>{};

  dish$ = this.store.select('dish', 'dishList');
  dishList: Dish[] = [];

  subscriptions: Subscription[] = [];
  
  interval: any; // Biến để lưu trữ định kỳ tự động chuyển slide
  intervalTime = 2000; // Thời gian giữa mỗi lần chuyển slide (5 giây)
  activeIndex = 0;
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
  // Hàm này sẽ bắt đầu tự động chuyển đổi slide
  startSlider() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, this.intervalTime);
  }
  
  stopSlider() {
    clearInterval(this.interval);
  }
  
  nextSlide(): void {
    if (this.activeIndex < this.dishList.length - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0;
    }
  }
  
  prevSlide(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.dishList.length - 1;
    }
  }

  // Hàm này được gọi khi component được tạo ra
  ngOnInit() {
    this.store.dispatch(DishActions.get({ featured: true }));

    this.subscriptions.push(
      this.dish$.subscribe((dishList) => {
        if (dishList.length > 0) {
          console.log(dishList);
          this.dishList = dishList;
          this.startSlider(); // Bắt đầu chạy slider khi danh sách món ăn đã được load
        }
      })
    );
  }

  // Hàm này được gọi khi component bị hủy
  ngOnDestroy(): void {
    this.stopSlider(); // Dừng chạy slider khi component bị hủy
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }


  tablebooking() {
    this.router.navigate(['base/booking']);
  }



}
