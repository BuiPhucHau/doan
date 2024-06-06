import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as PaymentMomoActions from "../actions/paymentmomo.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { PaymentMomoService } from "../../service/paymentmomo/paymentmomo.service";

@Injectable()
export class PaymentMomoEffects{
    constructor(
        private actions$: Actions,
        private paymentMomoService: PaymentMomoService
    ){}

    createPayment$ = createEffect(()=>
        this.actions$.pipe(
            ofType(PaymentMomoActions.createAtConfirmPayment),
            exhaustMap((action)=>
                this.paymentMomoService.createPayment(action.bill).pipe(
                    map((paymentmomo)=>{
                        return PaymentMomoActions.createAtConfirmPaymentSuccess({paymentmomo: paymentmomo})
                    }),
                    catchError((error)=>{
                        return of(PaymentMomoActions.createAtConfirmPaymentFailure({error}))
                    })
                )
            )

        )
    )
}