import { Storage } from '@angular/fire/storage';

export interface Location {
  _id: string,
  locationId: string;
  name: string;
  phone: string;
  address: string;
  image: Storage;
}
