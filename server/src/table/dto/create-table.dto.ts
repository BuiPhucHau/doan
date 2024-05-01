export class CreateTableDto {
    constructor(
        public tableId: string,
        public tableName: string,
        public seats: number,
        public setdishes: boolean,
        public status: boolean,
        public locationId: string,
        public reservationId?: string,

    ) {

    }
}
