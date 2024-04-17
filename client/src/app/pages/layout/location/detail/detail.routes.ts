import { DetailComponent } from "./detail.component";
import { Routes } from "@angular/router";
export const DETAIL_ROUTES: Routes = [
    {
        path: '',
        component: DetailComponent
    },
    {
        path: ':locationId',
        component: DetailComponent
    }
];