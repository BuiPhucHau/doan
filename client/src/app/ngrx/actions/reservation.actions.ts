import { createAction, props } from "@ngrx/store";
import { Reservation } from "../../models/reservation.model";

export const get = createAction(
    '[Reservation] get all',
);

export const getSuccess = createAction(
    '[Reservation] get success',
    props<{ reservationList: Reservation[] }>()
);

export const getFailure = createAction(
    '[Reservation] get failure',
    props<{ getErrMess: any }>()
);