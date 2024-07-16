import { ICart } from './icart';

export interface IBill {
    BillId: number,
    dishList : ICart[],
    Total: number,
    QuantityTotal: number,
    TableId: string,
    OrderId: number,
    DatePayment: Date,
}