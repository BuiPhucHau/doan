import { Category } from "src/category/entities/category.entity";

export class CreateDishDto {

    constructor 
    (
        public dId: string,
        public nameDish: string,
        public description: string,
        public price: number,
        public image: string,
        public cId: Category[],
        public status: boolean,
        // public isConfirmed: boolean
        public featured: boolean
    ) 
    {}
}