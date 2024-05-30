import { createAction, props } from '@ngrx/store';
import { Reservation } from '../../models/reservation.model';

//get reservation
export const get = createAction('[Reservation] get all');

export const getSuccess = createAction(
  '[Reservation] get success',
  props<{ reservationList: Reservation[] }>()
);

export const getFailure = createAction(
  '[Reservation] get failure',
  props<{ getErrMess: any }>()
);

// create Reservation
export const createReservation = createAction(
  '[Reservation] create',
  props<{ reservation: any }>()
);

export const createReservationSuccess = createAction(
    '[Reservation] create success',
    props<{ reservation: Reservation }>()
);

export const createReservationFailure = createAction(
    '[Reservation] create failure',
    props<{ createErrMess: any }>()
);

export const removeReservation = createAction(
  '[Reservation] Delete Reservation',
  props<{ reservationId: string }>()
);

export const removeReservationSuccess = createAction(
  '[Reservation] Delete Reservation Success',
  props<{ reservationId: string }>()
);

export const removeReservationFailure = createAction(
  '[Reservation] Delete Reservation Failure',
  props<{ error: any }>()
);
