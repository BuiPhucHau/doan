import { createReducer, on } from "@ngrx/store";
import { OrderState } from "../state/order.state";
import * as OrderActions from "../actions/order.actions";
import { Order } from "../../models/order.model";

export const initialState: OrderState = {
    isGetLoading: false,
    isGetSuccess: false,
    getErrMess: '',
    orderList: [],
    
    isCreateOrderLoading: false,
    isCreateOrderSuccess: false,
    createErrMess: '',
    order: <Order>{},
    
    isAddLoading: false,
    isAddSuccess: false,
    addErrMess: '',
    };

export const orderReducer = createReducer(
    initialState,
    on(OrderActions.get, (state, action) => {
        console.log('get order reducer');    
        return {
            ...state,
            isGetLoading: true,
            isGetSuccess: false,
            getErrMess: '',
        };
    }),
    on(OrderActions.getSuccess, (state, action) => {
        console.log('getsuccess order reducer');
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: true,
            orderList: action.orderList,
        };
    }),
    on(OrderActions.getFailure, (state, action) => {
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: false,
            getErrMess: action.getErrMess,
        };
    }),
    on(OrderActions.getOrderId, (state, action) => {
        console.log('get by id order reducer');
        return {
            ...state,
            isGetLoading: false,
            isGetSuccess: true,
            orderId: action.orderId,
        };
    }
    ),
    on(OrderActions.createOrder, (state, action) => {
        console.log('create order reducer');
        return {
            ...state,
            isCreateOrderLoading: true,
            isCreateOrderSuccess: false,
            createErrMess: '',
        };
    }),
    on(OrderActions.createOrderSuccess, (state, action) => {
        console.log('create order success reducer');
        return {
            ...state,
            isCreateOrderLoading: false,
            isCreateOrderSuccess: true,
            order: action.order,
        };
    }),
    on(OrderActions.createOrderFailure, (state, action) => {
        console.log('create order failure reducer');
        return {
            ...state,
            isCreateOrderLoading: false,
            isCreateOrderSuccess: false,
            createErrMess: action.errorMessage,
        };
    }),
    on(OrderActions.resetIsAddSuccess, (state, action) => { 
        let newSate: OrderState = {
            ...state,
            isAddSuccess: false,
            isAddLoading: false,
        };
        return newSate;
        })
);
