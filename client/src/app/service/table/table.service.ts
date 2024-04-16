import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient : HttpClient) {}

  getTable () {
    return this.httpClient.get<Table[] | any>('http://localhost:3000/table/get-all');
  }

  createTable(table: any) {
    return this.httpClient.post<Table[] | any>('http://localhost:3000/table/create', table);
  }

  updateTable (tableId: string) {
    return this.httpClient.put<Table[] | any>(`http://localhost:3000/table/update/${tableId}`, tableId);
  }



}
