import { Bill } from "../../models/bill.model";

export interface BillState{
    billsTakenByGetByMonthAtStatistical: Bill[];
    isGetByMonthAtStatisticalLoading: boolean;
    isGetByMonthAtStatisticalSuccess: boolean;
    getByMonthAtStatisticalError: string;

    billsTakenByGetByYearAtStatistical: Bill[];
    isGetByYearAtStatisticalLoading: boolean;
    isGetByYearAtStatisticalSuccess: boolean;
    getByYearAtStatisticalError: string;

    billsTakenByGetByDateAtStatistical: Bill[];
    isGetByDateAtStatisticalLoading: boolean;
    isGetByDateAtStatisticalSuccess: boolean;
    getByDateAtStatisticalError: string;

    billCreatedAtPaymentSuccess: Bill;
    isCreateAtPaymentSuccessLoading: boolean;
    isCreateAtPaymentSuccessSuccess: boolean;
    createAtPaymentSuccessError: string;

}