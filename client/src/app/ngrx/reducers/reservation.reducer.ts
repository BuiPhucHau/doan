import { ReservationState } from "../state/reservation.state";
import * as ReservationActions from "../actions/reservation.actions";
import { createReducer, on } from "@ngrx/store";

export const initialState: ReservationState = {
    isGetLoading: false,
    isGetSuccess: false,
    getErrMess: "",
    reservationList: [],
}

export const reservationReducer = createReducer(initialState,
    on(ReservationActions.get, (state, action) => {
        console.log('get reservation reducer');
        return {
            ...state,
            isGetLoading: true,
            isGetSuccess: false,
            getErrMess: "",
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
    })
);