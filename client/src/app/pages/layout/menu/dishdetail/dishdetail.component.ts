import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../../ngrx/state/dish.state';
import { Subscription } from 'rxjs';
import { Dish } from '../../../../models/dish.model';
import * as DishActions from '../../../../ngrx/actions/dish.actions';
import { categoryState } from '../../../../ngrx/state/category.state';
import { Category } from '../../../../models/category.model';
import * as CategoryActions from '../../../../ngrx/actions/category.actions';
import { ShareModule } from '../../../../shared/shared.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import { get } from '../../../../ngrx/actions/location.actions';
@Component({
  selector: 'app-dishdetail',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './dishdetail.component.html',
  styleUrl: './dishdetail.component.scss'
})
export class DishdetailComponent implements OnDestroy {
  dish$ = this.store.select('dish', 'dishList');
  category$ = this.store.select('category', 'categories');
  dishList: Dish[] = [];
  dish: Dish = <Dish>{};
  categories: Category[] = [];
  subcriptions: Subscription[] = [];
  selectDish: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{
      dish: DishState;
      category: categoryState;
    }>
  ) {
    this.store.dispatch(DishActions.get({}));
    this.store.dispatch(CategoryActions.get());
    this.subcriptions.push(
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
  ngOnInit() {
    this.store.dispatch(DishActions.get({}));
    this.store.dispatch(CategoryActions.get());
  
    this.subcriptions.push(
      this.dish$.subscribe((dishList) => {
        if (dishList.length > 0) {
          this.dishList = dishList;
        }
      }),
      this.category$.subscribe((categories) => {
        if (categories && categories.length > 0) {
          this.categories = categories;
        }
      }),
    );
    this.route.params.subscribe(params => {
      const dId = params['dId'];
      if (dId) {
        this.selectDish = this.dishList.find(dish => dish.dId === dId);
        localStorage.setItem('selectDish', JSON.stringify(this.selectDish));
      }
      console.log(' doi tuong ' + this.selectDish);
      const storedDish = localStorage.getItem('selectDish');
      if (storedDish) {
        this.selectDish = JSON.parse(storedDish);
        console.log('JSON' + storedDish);
      } else {
        this.selectDish = null; 
      }
    });
   
  }
  ngOnDestroy(): void {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }
  goBack(): void {
    this.router.navigate(['/base/menu']);
  }
  addtoCart(dish: Dish): void {
    this.store.dispatch(DishActions.addtoCart({ dish: dish }));
    this.router.navigate(['/base/order'], { state: { dish: dish } });
  }

}
