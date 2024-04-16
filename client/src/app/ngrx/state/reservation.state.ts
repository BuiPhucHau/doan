import { Reservation } from "../../models/reservation.model";

export interface ReservationState {
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    reservationList: Reservation[];
}