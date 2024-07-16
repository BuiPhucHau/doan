import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../../models/bill.model';
import { IBill } from '../../models/ibill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private billKey = 'billItems';
  constructor(private httpClient: HttpClient) { }
  item: IBill = {} as IBill;
  addBillToPaymentSuccess(aBill: IBill): void {
    this.item = {
      BillId: aBill.BillId,
      dishList: aBill.dishList,
      Total: aBill.Total,
      QuantityTotal: aBill.QuantityTotal,
      TableId: aBill.TableId,
      OrderId: aBill.OrderId,
      DatePayment: aBill.DatePayment,
    }
    this.saveBillToLocalStorage();
  }
  private saveBillToLocalStorage() {
    localStorage.setItem(this.billKey, JSON.stringify(this.item));
    console.log('bill', this.item);
  }
  private loadBillFromLocalStorage() {
    const bill = localStorage.getItem(this.billKey);
    if (bill) {
      this.item = JSON.parse(bill);
    }
  }
  getBillFromPaymentSuccess() {
    this.loadBillFromLocalStorage();
    console.log('bill', this.item);
    return this.item;
  }
  // Get bill by month
  getByMonth(month: number, year: number) {
    return this.httpClient.get<Bill[]>(`${URL}/bill/getByMonth?month=${month}&year=${year}`);
  }
  // Get bill by year
  getByYear(year: number) {
    return this.httpClient.get<Bill[]>(`${URL}/bill/getByYear?year=${year}`);
  }
  // Get bill by date
  getByDate(date: string) {
    return this.httpClient.get<Bill[]>(`${URL}/bill/getByDate?date=${date}`);
  }
  // Create bill
  create(bill: any) {
    return this.httpClient.post<Bill>(`${URL}/bill/create`, bill);
  }
  getById(id: string) {
    return this.httpClient.get<Bill>(`${URL}/bill/getById?id=${id}`);
  }

}