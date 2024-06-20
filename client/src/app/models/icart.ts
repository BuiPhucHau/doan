import { Category } from './category.model';
import { Storage } from './storage.model';

export interface ICart {
    _id: string,
    dId: string,
    nameDish: string,
    description: string,
    price: number,
    image: Storage,
    category: Category,
    featured: boolean,
    quantity: number,
}
