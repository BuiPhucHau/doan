import { Injectable } from '@angular/core';
import { LocationService } from '../../service/location/location.service';
import * as LocationActions from '../actions/location.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { OrderService } from '../../service/order/order.service';
import * as OrderActions from '../actions/order.actions';
@Injectable()
export class OrderEffects {
  constructor(
    private orderService: OrderService,
    private action$: Actions
  ) {}

  getOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderActions.get),
      exhaustMap(() =>
        this.orderService.getOrder().pipe(
          map((items) => {
            if (items.length > 0) {
              return OrderActions.getSuccess({ orderList: items });
            } else {
              return OrderActions.getFailure({
                getErrMess: 'No location found',
              });
            }
          }),
          catchError((err) =>
            of(OrderActions.getFailure({ getErrMess: err }))
          )
        )
      )
    )
  );
  createOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrderActions.createOrder),
      exhaustMap((action) =>
        this.orderService.createOrder(action.order).pipe(
          map(() => {
            console.log(action.order);
            return OrderActions.createOrderSuccess({
              order: action.order,
            });
          }),
          catchError((err) =>
            of(OrderActions.createOrderFailure({ errorMessage: err }))
          )
        )
      )
    )
  );
}
