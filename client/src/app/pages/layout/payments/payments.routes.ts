
import { Routes } from "@angular/router";
import { PaymentsComponent } from "./payments.component";

export const PAYMENTS_ROUTERS: Routes = [
    {
        path: '',
        component: PaymentsComponent
    },
    {
        path: ':dId',
        component: PaymentsComponent
    },
]