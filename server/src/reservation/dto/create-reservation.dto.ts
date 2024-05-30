export class CreateReservationDto {
    constructor(
        public reservationId: string,
        public numberofPeople: number,
        public date: Date,
        public time: string,
        public tableId: string,
        public uId: string,
        public phone: string,
        public name: string,
        public status: boolean
    ) {

    }
}
