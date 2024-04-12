import { Category } from './category.model';
import { Storage } from './storage.model';


export interface Dish {
    _id: string,
    dId: string,
    nameDish: string,
    description: string,
    price: number,
    image: Storage,
    category: Category,
    status: boolean,
    featured: boolean,
    // isConfirmed:boolean
}