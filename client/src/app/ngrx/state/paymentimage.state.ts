import { PaymentImage } from "../../models/paymentimage.model";

export interface PaymentImageState {
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    paymentImageList: PaymentImage[];
}