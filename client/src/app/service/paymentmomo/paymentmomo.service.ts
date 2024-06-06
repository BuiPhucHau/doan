import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentMomo } from '../../models/paymentmomo.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentMomoService {

  constructor(private httpClient: HttpClient) {}

  createPayment(bill: any){

    return this.httpClient.post<PaymentMomo>('http://localhost:3000/paymentmomo/create',bill);
  }
}
