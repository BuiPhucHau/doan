import { Table } from "../../models/table.model";

export interface TableState {
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    tableList: Table[]; 

    isGetByLocationLoading: boolean;
    isGetByLocationSuccess: boolean;
    getByLocationErrMess: string;
    getTableByLocationId: Table[];
    
}