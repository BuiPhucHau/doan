import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient : HttpClient) {}

  getReservation () {
    return this.httpClient.get<Reservation[] | any>('http://localhost:3000/reservation/get-all');
  }

  createReservation (reservation: Reservation) {
    // console.log(reservation);
    return this.httpClient.post<Reservation>('http://localhost:3000/reservation/create', reservation);
  }

  updateReservation (reservationId: string) {
    return this.httpClient.put<Reservation[] | any>(`http://localhost:3000/reservation/update/${reservationId}`, reservationId);
  }
}
