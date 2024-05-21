import { createAction, props } from "@ngrx/store";
import { Order } from "../../models/order.model";


export const get = createAction(
    '[Order] get all',
);
export const getOrderId = createAction(
    '[Order] get by id',
    props<{ orderId: string }>()
);
export const getSuccess = createAction(
    '[Order] get success',
    props<{ orderList: Order[] }>()
);

export const getFailure = createAction(
    '[Order] get failure',
    props<{ getErrMess: any }>()
);

export const createOrder = createAction(
    '[Order] create',
    props<{ order: any }>()
);
export const createOrderSuccess = createAction(
    '[Order] create success',
    props<{ order: Order }>()
);
export const createOrderFailure = createAction(
    '[Order] create fail',
    props<{ errorMessage: any }>()
);

export const resetIsAddSuccess = createAction(
    '[Order] reset is add success',
);