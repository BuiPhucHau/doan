import { Location } from './location.model';
import { Storage } from './storage.model';
import { Table } from './table.model';

export interface ITable {
    reservationId: string,
    numberofPeople: number,
    date: Date,
    time: string,
    tableId: Table,
    phone: string,
    name: string,
}
