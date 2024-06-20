import { Dish } from "../../models/dish.model";

export interface DishState { 

    ///////////////GET
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    dishList: Dish[];
    selectedDishes: Dish[];

    ///////////////CREATE
    isCreateDishLoading: boolean,
    isCreateDishSuccess: boolean,
    createErrMess: string,
    dish: Dish,

    ///////////////ADD
    isAddLoading: boolean;
    isAddSuccess: boolean;
    addErrMess: string;

    //////////////UPDATE
    isUpdateLoading: boolean;
    isUpdateSuccess: boolean;
    updateErrMess: string;
    
    ///////////////DELETE
    isRemoveLoading: boolean;
    isRemoveSuccess: boolean;
    removeErrMess: string;
    dId: string;
}