import { Location } from './location.model';
import { Storage } from './storage.model';
export interface Table {
     tableId: string,
     tableName: string,
     seats: number,
     status: boolean,
     locationId: Location,
     reservationId?: string,
     avatarUrl?: Storage;
}