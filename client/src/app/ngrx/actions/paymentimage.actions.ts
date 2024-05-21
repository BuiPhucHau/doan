import { createAction, props } from "@ngrx/store";
import { PaymentImage } from "../../models/paymentimage.model";

export const get = createAction(
    '[PaymentImage] get all',
);
export const getSuccess = createAction(
    '[PaymentImage] get success',
    props<{ paymentImageList: PaymentImage[] }>()
);
export const getFailure = createAction(
    '[PaymentImage] get failure',
    props<{ getErrMess: any }>()
);

