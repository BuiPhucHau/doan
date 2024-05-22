import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../models/location.model';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationKey = 'locationItems';

  constructor(private httpClient: HttpClient) { }
  locationItem: Location = {} as Location;

  addToLocationDetail(locaDetail: Location): void {
    this.locationItem = {
      _id: locaDetail._id,
      locationId: locaDetail.locationId,
      name: locaDetail.name,
      phone: locaDetail.phone,
      address: locaDetail.address,
      image: locaDetail.image
    }
    this.saveLocationDetailToLocalStorage();
  }
  private saveLocationDetailToLocalStorage(){
    localStorage.setItem(this.locationKey, JSON.stringify(this.locationItem));
    console.log("luu thanh cong");
  }
  getLocationDetail() {
    this.loadLocationDetailFromLocalStorage();
    console.log(this.locationItem);
    return this.locationItem;
  }
  private loadLocationDetailFromLocalStorage(): void {
    const storedItems = localStorage.getItem(this.locationKey);
    if (storedItems) {
      this.locationItem = JSON.parse(storedItems);
    }
    console.log("get thanh cong");
  }
  getLocation() {
    return this.httpClient.get<Location[] | any>('http://localhost:3000/location/get-all');
  }
  getLocationById(locationId: string) {
    return this.httpClient.get<Location[] | any>(`http://localhost:3000/location/getByLocationId?locationId=${locationId}`);
  }
  createLocation(location: any) {
    return this.httpClient.post<Location[] | any>('http://localhost:3000/location/create', location);
  }

  removeLocation(locationId: string) {
    console.log(locationId);
    return this.httpClient.delete(`http://localhost:3000/location/delete?id=${locationId}`);
  }

  updateLocation(location: any) {
    console.log(location);
    return this.httpClient.put<Location[] | any>(`http://localhost:3000/location/update?id=${location.locationId}`, location);
  }

}
