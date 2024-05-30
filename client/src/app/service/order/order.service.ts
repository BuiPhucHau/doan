import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../../models/iorder.model';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderKey = 'orderItems';


  constructor(private httpClient: HttpClient ) { }
  orderItem: IOrder = {} as IOrder;

  addToOrderDetail(orderDetai: IOrder): void {
    this.orderItem = {
      reservationId: orderDetai.reservationId,
      tableId: orderDetai.tableId,
      orderId: orderDetai.orderId,
      orderName: orderDetai.orderName,
      orderPhone: orderDetai.orderPhone,
      orderAddress: orderDetai.orderAddress,
      orderEmail: orderDetai.orderEmail,
      orderDate: orderDetai.orderDate
    }
    this.saveOrderDetailToLocalStorage();
  }
  private saveOrderDetailToLocalStorage(){
    localStorage.setItem(this.orderKey, JSON.stringify(this.orderItem));
    console.log("luu thanh cong");
  }
  getOrderDetail() {
    this.loadOrderDetailFromLocalStorage();
    console.log(this.orderItem);
    return this.orderItem;
  }
  private loadOrderDetailFromLocalStorage(): void {
    const storedItems = localStorage.getItem(this.orderKey);
    if (storedItems) {
      this.orderItem = JSON.parse(storedItems);
    }
    console.log("get order thanh cong");
  }
  clearCart() {
    this.orderItem = {} as IOrder;
    localStorage.removeItem(this.orderKey);
  }
  
  getOrder() {
    return this.httpClient.get<Order[] | any>('http://localhost:3000/order/get-all');
  }
  getOrderById(orderId: string) {
    return this.httpClient.get<Order[] | any>(`http://localhost:3000/order/getByOrderId?orderId=${orderId}`);
  }
  createOrder(order: any) {
    console.log(order);
    return this.httpClient.post<Order[] | any>('http://localhost:3000/order/create', order);
  }

}
