import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { PaymentimageService } from "../../service/paymentimage/paymentimage.service";
import * as PaymentImageActions from '../actions/paymentimage.actions';

@Injectable()
export class PaymentImageEffects {
  constructor(
    private paymentImageService: PaymentimageService,
    private action$: Actions
  ) {}

  getPaymentImage$ = createEffect(() =>
    this.action$.pipe(
      ofType(PaymentImageActions.get),
      exhaustMap(() =>
        this.paymentImageService.getPaymentImage().pipe(
          map((items) => {
            console.log('items', items);
            if (items.length > 0) {
              return PaymentImageActions.getSuccess({ paymentImageList: items });
            } else {
              return PaymentImageActions.getFailure({
                getErrMess: 'No payment image found',
              });
            }
          }),
          catchError((err) =>
            of(PaymentImageActions.getFailure({ getErrMess: err }))
          )
        )
      )
    )
  );
}

