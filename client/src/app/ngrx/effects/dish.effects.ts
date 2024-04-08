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
      exhaustMap((action) =>
        this.dishService.getDishes(action.isConfirmed).pipe(
          map((items) => {
            if (items != null || items != undefined) {
              if (items.message) {
                return DishActions.getFailure({ getErrMess: items.message });
              }
              return DishActions.getSucces({ dishList: items });
            } else {
              return DishActions.getFailure({ getErrMess: 'Dish null' });
            }
          }),
          catchError((err) => of(DishActions.getFailure({ getErrMess: err })))
        )
      )
    )
  );
}
