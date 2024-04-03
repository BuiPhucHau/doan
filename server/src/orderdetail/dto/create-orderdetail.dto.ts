import { Dish } from "src/dish/entities/dish.entity";

export class CreateOrderdetailDto {
    constructor(
        public odId: string,
        public oId: string,
        public dId: string,
        public uid: string,
        public dishList: Dish[],
        public quantity: number,
        public price: number,
        public total: number,
    ){}
}
