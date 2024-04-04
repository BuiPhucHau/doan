export class CreateTableDto {
    constructor(
        public tableId: string,
        public seats: number,
        public status: boolean,
        public locationId: string,
        public reservationId?: string,
    ) {

    }
}
