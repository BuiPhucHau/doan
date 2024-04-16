import { Injectable } from "@angular/core";
import * as ReservationActions from "../actions/reservation.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReservationService } from "../../service/reservation/reservation.service";
import { catchError, exhaustMap, map, of } from "rxjs";
@Injectable() 
export class ReservationEffects { 
    constructor (private  action$: Actions, private reservationService : ReservationService) {}

    getReservation$ = createEffect(() =>
        this.action$.pipe(
        ofType(ReservationActions.get),
        exhaustMap(() =>
            this.reservationService.getReservation().pipe(
            map((items) => {
                if(items.length > 0) {
                return ReservationActions.getSuccess({ reservationList: items });
                } else {
                return ReservationActions.getFailure({ getErrMess: 'No reservation found' });
                }
            }),
            catchError((err) => of(ReservationActions.getFailure({ getErrMess: err })))
            )
        )
        )
    );

}