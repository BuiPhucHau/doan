import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../../models/table.model';
import { ITable } from '../../models/itable.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private tableKey = 'tableItems';

  constructor(private httpClient : HttpClient) {}

  items: ITable[] = [];
  item: ITable = {} as ITable;

  addToTableToCart(toTable: Table ): void {
    var index = this.items.findIndex(x => x.tableId === toTable.tableId);
    if (index >= 0) {
      
    } else {
      var t: ITable;
      t = {
        tableId: toTable.tableId,
        tableName: toTable.tableName,
        seats: toTable.seats,
        status: toTable.status,
        locationId: toTable.locationId,
        reservationId: toTable.reservationId,
        avatarUrl: toTable.avatarUrl
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

  removeFromItemTable(tableId: string): void {
    const index = this.items.findIndex(item => item.tableId === tableId);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveCartToLocalStorage();
    }
  }
  clearCart() {
    this.items = [];
    localStorage.removeItem(this.tableKey);
  }

  getTable () {
    return this.httpClient.get<Table[] | any>('http://localhost:3000/table/get-all');
  }

  getByLocation (name: string) {
    return this.httpClient.get<Table[] | any>(`http://localhost:3000/table/getByLocation?id=${name}`);
  }

  createTable(table: any) {
    return this.httpClient.post<Table[] | any>('http://localhost:3000/table/create', table);
  }

  updateTable (tableId: string) {
    return this.httpClient.put<Table[] | any>(`http://localhost:3000/table/update/${tableId}`, tableId);
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
    console.log("get thanh cong");
  }


}
