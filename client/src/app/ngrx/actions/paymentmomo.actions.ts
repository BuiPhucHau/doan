import { createAction, props } from "@ngrx/store";
import { PaymentMomo } from "../../models/paymentmomo.model";

export const createAtConfirmPayment = createAction(
    '[Payment] Create At Confirm Payment',
    props<{ bill:any}>()
    );
export const createAtConfirmPaymentSuccess = createAction(
    '[Payment] Create At Confirm Payment Success',
    props<{ paymentmomo: PaymentMomo }>()
    );
export const createAtConfirmPaymentFailure = createAction(
    '[Payment] Create At Confirm Payment Failure',
    props<{ error: string }>()
    );
