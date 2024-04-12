import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private httpClient: HttpClient) {}

  getLocation() {
    return this.httpClient.get<Location[] | any>('http://localhost:3000/location/get-all');
  }

  createLocation(dish : any) { 
    return this.httpClient.post<Location[] | any>('http://localhost:3000/Location/create', dish);
  }

  removeLocation(dId: string) {
    return this.httpClient.delete(
      `http://localhost:3000/Location/delete?=id/${dId}`
    );
  }

//   updateLocation(dish: any) {
//     return this.httpClient.put<Location[] | any>(
//       `http://localhost:3000/Location/update/${dish.dId}`, dish
//     );
//   }

//   confirmDish(dId: string) {
//     return this.httpClient.put<Dish[] | any>(
//       `http://localhost:3000/Location/confirm/${dId}`, {status: true}
//     );
//   }

//   updateStatusAll( ids: string[], status: boolean) {
//     return this.httpClient.put<Dish[] | any>(
//       `http://localhost:3000/Location/allstatus?status=${status}`, {ids}
//     );
//   }
}
