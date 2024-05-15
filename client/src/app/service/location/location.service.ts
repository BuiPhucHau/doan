import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../models/location.model';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  getLocation() {
    return this.httpClient.get<Location[] | any>('http://localhost:3000/location/get-all');
  }
  getLocationById(locationId: string) {
    return this.httpClient.get<Location[] | any>(`http://localhost:3000/location/getByLocationId?locationId=${locationId}`);
  }
  createLocation(location: any) {
    console.log(location);
    return this.httpClient.post<Location[] | any>('http://localhost:3000/location/create', location);
  }

}
