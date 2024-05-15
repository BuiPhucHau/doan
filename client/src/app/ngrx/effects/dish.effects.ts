import { Injectable } from '@angular/core';
import { DishService } from '../../service/dish/dish.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import * as DishActions from '../actions/dish.actions';

@Injectable()
export class DishEffects {
  constructor(private dishService: DishService, private action$: Actions) {}

  getDish$ = createEffect(() =>
    this.action$.pipe(
      ofType(DishActions.get),
      exhaustMap(() =>
        this.dishService.getDish().pipe(
          map((items) => {
            if (items.length > 0) {
              return DishActions.getSuccess({ dishList: items });
            } else {
              return DishActions.getFailure({ getErrMess: 'No dish found' });
            }
          }),
          catchError((err) => of(DishActions.getFailure({ getErrMess: err })))
        )
      )
    )
  );
  createDish$ = createEffect(() =>
    this.action$.pipe(
      ofType(DishActions.createDish),
      exhaustMap((action) =>
        this.dishService.createDish(action.dish).pipe(
          map(() => {
            console.log(action.dish);
            return DishActions.createDishSuccess({ dish: action.dish });
          }),
          catchError((err) =>
            of(DishActions.createDishFailure({ errorMessage: err }))
          )
        )
      )
    )
  );
}
