import { Routes } from "@angular/router";
import { DishdetailComponent } from "./dishdetail.component";
export const DISHDETAIL_ROUTERS: Routes = [
    { 
        path: '',
        component: DishdetailComponent
    },
    { 
        path: ':dId',
        component: DishdetailComponent
    },
]