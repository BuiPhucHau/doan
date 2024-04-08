export class CreateDishDto {

    constructor 
    (
        public dId: string,
        public nameDish: string,
        public description: string,
        public price: number,
        public image: string,
        public cId: string,
        public status: boolean,
        public isConfirmed: boolean
    ) 
    {}
}