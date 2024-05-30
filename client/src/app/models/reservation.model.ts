import { Table } from "./table.model";
import { User } from "./user.model";

export interface Reservation {
     reservationId: string,
     numberofPeople: number,
     date: Date,
     time: string,
<<<<<<< HEAD
     tableId: Table,
=======
     tableId: string,
>>>>>>> fd4d43a12698d12ca0960225d5347fc797710e50
     phone: string,
     name: string,
}