import { Dish } from "src/dish/entities/dish.entity";

export class CreatePaymentDto {
    constructor(
        public paymentId: string,
        public reservationId: string,
        public tableId: string,
        public oId: string,
        public uid: string,
        public paymentDate: Date,
        public paymentTotal: number,
        public dishList: Dish[],
    ){}
}
