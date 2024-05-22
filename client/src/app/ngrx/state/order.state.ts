import { Order } from "../../models/order.model";

export interface OrderState {
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    orderList: Order[];
    
    isCreateOrderLoading: boolean;
    isCreateOrderSuccess: boolean;
    createErrMess: string;
    order: Order;

    isAddLoading: boolean;
    isAddSuccess: boolean;
    addErrMess: string;
}