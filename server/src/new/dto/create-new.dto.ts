export class CreateNewDto {
  
    constructor
    (
        public  newId: string,
        public   day: number,
        public  month: string, 
        public  year: number, 
        public  news: string, 
        public  title: string, 
        public  text: string,
        public image: string,
    ) 
        {}
}
