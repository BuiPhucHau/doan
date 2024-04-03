export class CreateLocationDto {
    constructor 
    ( 
       public locationId: string,
       public name: string,
       public phone: string,
       public address: string,
       public image: string,      
    ) 
    {}
}