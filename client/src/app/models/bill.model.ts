
export interface Bill {
    _id: string;
    BillId: string,
    dishList : [],
    Total: number,
    GrandTotal: number,
    QuantityTotal: number,
    TableId: string,
    OrderId: string,
    DatePayment: Date,
    createAt: Date,
    updateAt: Date,
}