import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as BillActions from "../actions/bill.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { BillService } from "../../service/bill/bill.service";

@Injectable()
export class BillEffects {
    constructor(
        private actions$: Actions,
        private billService: BillService
    ) { }
    getByMonthAtStatistical$ = createEffect(()=>
        this.actions$.pipe(
            ofType(BillActions.getByMonthAtStatistical),
            exhaustMap((action)=>
                this.billService.getByMonth(action.month, action.year).pipe(
                    map((bills)=>{
                        return BillActions.getByMonthAtStatisticalSuccess({bills: bills})
                    }),
                    catchError((error)=>{
                        return of(BillActions.getByMonthAtStatisticalFailure({error}))
                    })
                )
            )

        )
    )
    getByYearAtStatistical$ = createEffect(()=>
        this.actions$.pipe(
            ofType(BillActions.getByYearAtStatistical),
            exhaustMap((action)=>
                this.billService.getByYear(action.year).pipe(
                    map((bills)=>{
                        return BillActions.getByYearAtStatisticalSuccess({bills: bills})
                    }),
                    catchError((error)=>{
                        return of(BillActions.getByYearAtStatisticalFailure({error}))
                    })
                )
            )

        )
    )
    getByDateAtStatistical$ = createEffect(()=>
        this.actions$.pipe(
            ofType(BillActions.getByDateAtStatistical),
            exhaustMap((action)=>
                this.billService.getByDate(action.date).pipe(
                    map((bills)=>{
                        return BillActions.getByDateAtStatisticalSuccess({bills: bills})
                    }),
                    catchError((error)=>{
                        return of(BillActions.getByDateAtStatisticalFailure({error}))
                    })
                )
            )

        )
    )

    createAtPayment$ = createEffect(()=>
        this.actions$.pipe(
            ofType(BillActions.createAtPaymentSuccess),
            exhaustMap((action)=>
                this.billService.create(action.bill).pipe(
                    map((bill)=>{
                        console.log("create bill success", bill)
                        return BillActions.createAtPaymentSuccessSuccess({bill: bill})
                    }),
                    catchError((error)=>{
                        return of(BillActions.createAtPaymentSuccessFailure({error}))
                    })
                )
            )

        )
    )
}