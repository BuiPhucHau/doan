import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentImage } from '../../models/paymentimage.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentimageService {
  constructor(private httpClient: HttpClient) { 
}
getPaymentImage() {
  return this.httpClient.get<PaymentImage[] | any>('http://localhost:3000/payment-image/get-all');
}
createPaymentImage(paymentImage: any) {
  return this.httpClient.post<PaymentImage[] | any>('http://localhost:3000/payment-image/create', paymentImage);
}
}