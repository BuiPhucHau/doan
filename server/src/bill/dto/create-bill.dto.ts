export class CreateBillDto {
    constructor(
        public BillId: string,
        public dishList: [],
        public TableId: string,
        public OrderId: string,
        public Total: number,
        public QuantityTotal: number,
        public DatePayment: Date,
    ){}

}
