import { Dish } from "../../models/dish.model";

export interface DishState { 
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    dishList: Dish[];
    selectedDishes: Dish[];
}