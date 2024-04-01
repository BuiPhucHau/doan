export class CreateReservationDto {
    constructor(
        public rId: string,
        public numberofPeople: number,
        public date: Date,
        public time: string,
        public tableId: string,
        public uId: string,
        public phone: string,
        public name: string,
    ) {

    }
}
