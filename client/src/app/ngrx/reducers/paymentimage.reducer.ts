import { createReducer, on } from "@ngrx/store";
import { PaymentImageState } from "../state/paymentimage.state";
import * as PaymentImageActions from "../actions/paymentimage.actions";

export const initialState: PaymentImageState = {
    isGetLoading: false,
    isGetSuccess: false,
    getErrMess: "",
    paymentImageList: [],
};

export const paymentImageReducer = createReducer(
    initialState,
    on(PaymentImageActions.get, (state, action) => {
        console.log('get payment image reducer');
        return {
            ...state,
            isGetLoading: true,
            isGetSuccess: false,
            getErrMess: "",
        };
    }),
    on(PaymentImageActions.getSuccess, (state, action) => {
        console.log('getsuccess payment image reducer', action.paymentImageList[0].paymentImage.urls);

        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: true,
            paymentImageList: action.paymentImageList,
        };
    }),
    on(PaymentImageActions.getFailure, (state, action) => {
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: false,
            getErrMess: action.getErrMess,
        };
    })
);