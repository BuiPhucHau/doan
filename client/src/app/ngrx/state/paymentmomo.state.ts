import { PaymentMomo } from "../../models/paymentmomo.model";

export interface PaymentMomoState{
    paymentCreatedAtConfirmPayment: PaymentMomo;
    isCreateAtConfirmPaymentLoading: boolean;
    isCreateAtConfirmPaymentSuccess: boolean;
    createAtConfirmPaymentError: string;
}