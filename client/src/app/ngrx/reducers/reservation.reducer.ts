import { ReservationState } from '../state/reservation.state';
import * as ReservationActions from '../actions/reservation.actions';
import { createReducer, on } from '@ngrx/store';
import { Reservation } from '../../models/reservation.model';

export const initialState: ReservationState = {
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  reservationList: [],

  isCreateReservationLoading: false,
  isCreateReservationSuccess: false,
  createErrMess: '',
  reservation:<Reservation>{},

  isRemoveReservationLoading: false,
  isRemoveReservationSuccess: false,
  removeErrMess: '',
};

//////////////////////////// GET reservation //////////////////////////
export const reservationReducer = createReducer(
  initialState,
  on(ReservationActions.get, (state, action) => {
    console.log('get reservation reducer');
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
    };
  }),
  on(ReservationActions.getSuccess, (state, action) => {
    console.log('getsuccess reservation reducer');
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      reservationList: action.reservationList,
    };
  }),
  on(ReservationActions.getFailure, (state, action) => {
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.getErrMess,
    };
  }),

  //////////////////////////// CREATE reservation //////////////////////////
  on(ReservationActions.createReservation, (state, action) => {
    // console.log(action)
    return {
      ...state,
      isCreateReservationLoading: true,
      isCreateReservationSuccess: false,
      getErrMess: "",
    };
  }),
  on(ReservationActions.createReservationSuccess, (state, action) => {
    // console.log(action.reservation)
    return {
      ...state,
      reservation: action.reservation,
      isCreateReservationLoading: false,
      isCreateReservationSuccess: true,
      getErrMess: "",
    };
  }),
  on(ReservationActions.createReservationFailure, (state, action) => {
    return {
      ...state,
      isCreateReservationLoading: false,
      isCreateReservationSuccess: false,
      createErrMess:action.createErrMess,
    };
  }),

  //////////////////////////// REMOVE reservation //////////////////////////
  on(ReservationActions.removeReservation,(state) =>
  {
    return {
      ...state,
      isRemoveReservationLoading: true,
      isRemoveReservationSuccess: false,
      removeErrMess: '',
    };
  }),
  on(ReservationActions.removeReservationSuccess, (state, { reservationId })=> {
    return {
      ...state,
      isRemoveReservationLoading: false,
      isRemoveReservationSuccess: true,
      reservationList: state.reservationList.filter(reservation => reservation.reservationId !== reservationId)
    };
  }),
  on(ReservationActions.removeReservationFailure, (state, {error}) => {
    return {
      ...state,
      isRemoveReservationLoading: false,
      isRemoveReservationSuccess: false,
      removeErrMess: error,
    };
  })
);
