import { createAction, props } from "@ngrx/store";
import { Bill } from "../../models/bill.model";

export const getByMonthAtStatistical = createAction(
    '[Bill] Get By Month At Statistical',
    props<{month: number, year: number}>()
    );
export const getByMonthAtStatisticalSuccess = createAction(
    '[Bill] Get By Month At Statistical Success',
    props<{bills: Bill[]}>()
    );
export const getByMonthAtStatisticalFailure = createAction(
    '[Bill] Get By Month At Statistical Failure',
    props<{error: string}>()
    );



//////////////////////////////////////////////////////////////////////////////////////////////////////  
export const getByYearAtStatistical = createAction(
    '[Bill] Get By Year At Statistical',
    props<{year: number}>()
    );
export const getByYearAtStatisticalSuccess = createAction(
    '[Bill] Get By Year At Statistical Success',
    props<{bills: Bill[]}>()
    );
export const getByYearAtStatisticalFailure = createAction(
    '[Bill] Get By Year At Statistical Failure',
    props<{error: string}>()
    );





//////////////////////////////////////////////////////////////////////////////////////////////////////  
export const getByDateAtStatistical = createAction(
    '[Bill] Get By Date At Statistical',
    props<{date: string}>()
    );
export const getByDateAtStatisticalSuccess = createAction(
    '[Bill] Get By Date At Statistical Success',
    props<{bills: Bill[]}>()
    );
export const getByDateAtStatisticalFailure = createAction(
    '[Bill] Get By Date At Statistical Failure',
    props<{error: string}>()
    );


//////////////////////////////////////////////////////////////////////////////////////////////////////
export const createAtPaymentSuccess = createAction(
    '[Bill] Create At PaymentSuccess',
    props<{bill:any}>()
    );
export const createAtPaymentSuccessFailure = createAction(
    '[Bill] Create At PaymentSuccess Failure',
    props<{error: string}>()
    );
export const createAtPaymentSuccessSuccess = createAction(
    '[Bill] Create At PaymentSuccess Success',
    props<{bill: Bill}>()
    );


