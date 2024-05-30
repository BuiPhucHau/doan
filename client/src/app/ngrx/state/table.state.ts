import { Table } from "../../models/table.model";

export interface TableState {
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    tableList: Table[]; 

    isGetByLocationIdLoading: boolean;
    isGetByLocationIdSuccess: boolean;
    getByLocationIdErrMess: string;
    tablesTakenByGetByLocationId: Table[];
    
    isCheckoutLoading: boolean;
    isCheckoutSuccess: boolean;
    checkoutErrMess: string;
}