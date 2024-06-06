import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  
  constructor(private httpClient: HttpClient) {}
  getByMonth(month: number, year: number){
    return this.httpClient.get<Bill[]>(`${URL}/bill/getByMonth?month=${month}&year=${year}`);
  }
  getByYear(year: number){
    return this.httpClient.get<Bill[]>(`${URL}/bill/getByYear?year=${year}`);
  }
  getByDate(date: string){
    return this.httpClient.get<Bill[]>(`${URL}/bill/getByDate?date=${date}`);
  }
  create(bill: any){
    return this.httpClient.post<Bill>(`${URL}/bill/create`, bill);
  }
}