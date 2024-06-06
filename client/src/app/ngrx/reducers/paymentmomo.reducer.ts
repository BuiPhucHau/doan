import { createReducer, on } from "@ngrx/store";
import { PaymentMomo } from "../../models/paymentmomo.model";
import { PaymentMomoState } from "../state/paymentmomo.state";
import * as PaymentMomoActions from '../actions/paymentmomo.actions';

export const initialState: PaymentMomoState = {
    paymentCreatedAtConfirmPayment: <PaymentMomo>{},
    isCreateAtConfirmPaymentLoading: false,
    isCreateAtConfirmPaymentSuccess: false,
    createAtConfirmPaymentError: ''
};

export const paymentMomoReducer = createReducer(
    initialState,
    on(PaymentMomoActions.createAtConfirmPayment, (state,action) => {
        return{
            ...state,
            isCreateAtConfirmPaymentLoading: true,
            isCreateAtConfirmPaymentSuccess: false,
            createAtConfirmPaymentError: ''
        }
    }),
    on(PaymentMomoActions.createAtConfirmPaymentSuccess, (state,action) => {
        return{
            ...state,
            paymentCreatedAtConfirmPayment: action.paymentmomo,
            isCreateAtConfirmPaymentLoading: false,
            isCreateAtConfirmPaymentSuccess: true,
            createAtConfirmPaymentError: ''
        }
    }),
    on(PaymentMomoActions.createAtConfirmPaymentFailure, (state,action) => {
        return{
            ...state,
            isCreateAtConfirmPaymentLoading: false,
            isCreateAtConfirmPaymentSuccess: false,
            createAtConfirmPaymentError: action.error
        }
    })
    
);
