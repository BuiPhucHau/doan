import { Reservation } from '../../models/reservation.model';

export interface ReservationState {
  ///////////////GET
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
  reservationList: Reservation[];

  ///////////////CREATE
  isCreateReservationLoading: boolean,
  isCreateReservationSuccess: boolean,
  createErrMess: string,
  reservation: Reservation,

  ///////////////REMOVE
  isRemoveReservationLoading: boolean,
  isRemoveReservationSuccess: boolean,
  removeErrMess: string,
}
