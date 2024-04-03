
import { CreateDishDto } from 'src/dish/dto/create-dish.dto';
import { Dish } from 'src/dish/entities/dish.entity';

export class CreateOrderDto {
    constructor
    (
        public oId: string,
        public uid: string,
        public dishList:Dish[],
        public orderDate: Date,
        public total: number,
        public status: string,
    )
    {}
}
