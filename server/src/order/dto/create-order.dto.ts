
import { CreateDishDto } from 'src/dish/dto/create-dish.dto';
import { Dish } from 'src/dish/entities/dish.entity';

export class CreateOrderDto {
    constructor
    (
        public orderId: number,
        public orderName: string,
        public orderPhone: string,
        public orderAddress: string,
        public orderEmail: string,
        public orderDate: Date,
    )
    {}
}
