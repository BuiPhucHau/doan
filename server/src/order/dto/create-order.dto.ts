
import { CreateDishDto } from 'src/dish/dto/create-dish.dto';
import { Dish } from 'src/dish/entities/dish.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

export class CreateOrderDto {
    constructor
    (
        public reservationId: string,
        public orderId: number,
        public orderName: string,
        public orderPhone: string,
        public orderAddress: string,
        public orderEmail: string,
        public orderDate: Date,
    )
    {}
}
