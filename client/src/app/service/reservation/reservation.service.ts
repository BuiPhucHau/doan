import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { ITable } from '../../models/itable.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private tableKey = 'tableItems';

  constructor(private httpClient : HttpClient) {}

  items: ITable[] = [];
  item: ITable = {} as ITable;

  addToTableToCart(toTable: Reservation ): void {
    var index = this.items.findIndex(x => x.tableId === toTable.tableId);
    if (index >= 0) {
      
    } else {
      var t: ITable;
      t = {
        reservationId: toTable.reservationId,
    numberofPeople: toTable.numberofPeople,
    date:  toTable.date,
    time: toTable.time,
    tableId: toTable.tableId,
    phone: toTable.phone,
    name: toTable.name,
      }
      this.items.push(t);
    }
    this.saveCartToLocalStorage();
  }

  getItemTable() {
    this.loadTableToCartFromLocalStorage();
    console.log(this.items);
    return this.items;
  }

  removeFromItemTable(reservationId: string): void {
    const index = this.items.findIndex(item => item.reservationId === reservationId);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveCartToLocalStorage();
    }
  }
  clearCart() {
    this.items = [];
    localStorage.removeItem(this.tableKey);
  }
  
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

  private saveCartToLocalStorage(): void {
    localStorage.setItem(this.tableKey, JSON.stringify(this.items));
    console.log(this.items);
    console.log("luu thanh cong");
  }

  private loadTableToCartFromLocalStorage(): void {
    const storedItems = localStorage.getItem(this.tableKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
    console.log("get tableId thanh cong");
  }
}
