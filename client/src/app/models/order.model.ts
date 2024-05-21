
import { User } from "./user.model";
export interface Order {
    orderId: number,
    orderName: string;
    orderPhone: string;
    orderAddress: string;
    orderEmail: string;
    orderDate: Date;
  }
  