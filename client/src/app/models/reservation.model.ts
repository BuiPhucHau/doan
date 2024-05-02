import { Table } from "./table.model";
import { User } from "./user.model";

export interface Reservation {
     reservationId: string,
     numberofPeople: number,
     date: Date,
     time: string,
     tableId: Table,
     // uId: User,
     phone: string,
     name: string,
}