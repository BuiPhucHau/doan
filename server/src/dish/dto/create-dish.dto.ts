import { Category } from "src/category/entities/category.entity";

export class CreateDishDto {

    constructor 
    (
        public dId: string,
        public nameDish: string,
        public description: string,
        public price: number,
        public image: string,
        public category: Category,
        public featured: boolean,
        public quantity: number,
    ) 
    {}
}