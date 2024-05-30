import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { ITable } from '../../models/itable.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private tableKey = 'tableItems';

  constructor(private httpClient: HttpClient) { }

  // items: ITable[] = [];
//   item: ITable = {} as ITable;

//   addToTableToCart(toTable: Reservation): void {
//     this.item = {
//       reservationId: toTable.reservationId,
//       numberofPeople: toTable.numberofPeople,
//       date: toTable.date,
//       time: toTable.time,
//       tableId: toTable.tableId,
//       phone: toTable.phone,
//       name: toTable.name,
//     }
//     this.saveCartToLocalStorage();
//   }

// getItemTable() {
//   this.loadTableToCartFromLocalStorage();
//   console.log("get du lieu thanh công");
//   console.log(this.item);
//   return this.item;
// }
// clearItemTable() {
//   this.item = {} as ITable;
// }
getReservation() {
  return this.httpClient.get<Reservation[] | any>('http://localhost:3000/reservation/get-all');
}

createReservation(reservation: Reservation) {
  // console.log(reservation);
  return this.httpClient.post<Reservation>('http://localhost:3000/reservation/create', reservation);
}

updateReservation(reservationId: string) {
  return this.httpClient.put<Reservation[] | any>(`http://localhost:3000/reservation/update/${reservationId}`, reservationId);
}

removeReservation(reservationId: string): Observable<any> {
  return this.httpClient.delete(`http://localhost:3000/reservation/delete?id=${reservationId}`);
}

//   private saveCartToLocalStorage(): void {
//   localStorage.setItem(this.tableKey, JSON.stringify(this.item));
//   console.log(this.item);
//   console.log("luu thanh cong");
// }

//   private loadTableToCartFromLocalStorage(): void {
//   const storedItems = localStorage.getItem(this.tableKey);
//   if(storedItems) {
//     this.item = JSON.parse(storedItems);
//   }
//     console.log("get tableId thanh cong");
// }
}
