import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private httpClient: HttpClient) { }
  // Get all dishes
  getDish() {
    return this.httpClient.get<Dish[] | any>('http://localhost:3000/dish/get-all');
  }
  // Get dish by category
  getDishById(dId: string) {
    return this.httpClient.get<Dish[] | any>(`http://localhost:3000/dish/getbyDishId?dId=${dId}`);
  }
  //create dish
  createDish(dish: any) {
    console.log(dish);
    return this.httpClient.post<Dish[] | any>('http://localhost:3000/dish/create', dish);
  }
  //update dish
  updateDish(dish: any) {
    console.log(dish);
    return this.httpClient.put<Dish[] | any>(`http://localhost:3000/dish/update?id=${dish.dId}`, dish);
  }
  //remove location
  removeLocation(dId: string) {
    console.log(dId);
    return this.httpClient.delete(`http://localhost:3000/dish/delete?id=${dId}`);
  }

}
