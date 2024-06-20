import { Injectable } from '@angular/core';
import { DishService } from '../../service/dish/dish.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import * as DishActions from '../actions/dish.actions';

@Injectable()
export class DishEffects {
  constructor(private dishService: DishService, private action$: Actions) {}
  
  //Get
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

  //Create
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

  //Update
  updateDish$ = createEffect(() =>
    this.action$.pipe(
      ofType(DishActions.updateDish),
      exhaustMap((action) =>
        this.dishService.updateDish(action.dish).pipe(
          map(() => {
            console.log('API call success');
            return DishActions.updateDishSuccess();
          }),
          catchError((err) => {
            console.log('API call error', err);
            return of(
              DishActions.removeDishFailure({ removeErrMess: err })
            );
          })
        )
      )
    )
  );

    //Delete
    removeDish$ = createEffect(() =>
      this.action$.pipe(
        ofType(DishActions.removeDish),
        exhaustMap((action) =>
          this.dishService.removeLocation(action.dId).pipe(
            map(() => {
              console.log('API call success', action.dId);
              return DishActions.removeDishSuccess({
                dId: action.dId,
              });
            }),
            catchError((err) => {
              console.log('API call error', err);
              return of(
                DishActions.removeDishFailure({ removeErrMess: err })
              );
            })
          )
        )
      )
    );
}
