import { Dish } from "../../models/dish.model";

export interface DishState { 
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

    isAddLoading: boolean;
    isAddSuccess: boolean;
    addErrMess: string;
}