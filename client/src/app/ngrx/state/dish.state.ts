import { Dish } from "../../models/dish.model";

export interface DishState { 
    //get
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    dishList: Dish[];
    //add
    isAddLoading: boolean;
    isAddSuccess: boolean;
    addErrMess: string;
    dish: Dish;
    //remove
    isRemoveloading: boolean;
    isRemoveSuccess: boolean;
    removeErrMess: string;
    //update
    isUpdateLoading: boolean;
    isUpdateSuccess: boolean;
    updateErrMess: string;
    //confirm
    isConfirmLoading: boolean;
    isConfirmSuccess: boolean;
    confirmErrMess: string;
    //updatestatus
    isUpdateStatusTrueAllLoading: boolean;
    isUpdateStatusAllTrueSuccess: boolean;
    updateStatusAllTrueErrMess: string;
    isUpdateStatusFalseAllLoading: boolean;
    isUpdateStatusAllFalseSuccess: boolean;
    updateStatusAllFalseErrMess: string;
}