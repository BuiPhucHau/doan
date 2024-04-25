import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private httpClient: HttpClient) {}

  getDish() {
    return this.httpClient.get<Dish[] | any>('http://localhost:3000/dish/get-all');
  }
  getDishById(dId: string) {
    return this.httpClient.get<Dish[] | any>(`http://localhost:3000/dish/getbyDishId?dId=${dId}`);
  }

  createDish(dish : any) { 
    return this.httpClient.post<Dish[] | any>('http://localhost:3000/dish/create', dish);
  }

  // removeDish(dId: string) {
  //   return this.httpClient.delete(
  //     `http://localhost:3000/dish/delete?=id/${dId}`
  //   );
  // }

  // updateDish(dish: any) {
  //   return this.httpClient.put<Dish[] | any>(
  //     `http://localhost:3000/dish/update/${dish.dId}`, dish
  //   );
  // }

  // confirmDish(dId: string) {
  //   return this.httpClient.put<Dish[] | any>(
  //     `http://localhost:3000/dish/confirm/${dId}`, {status: true}
  //   );
  // }

  // updateStatusAll( ids: string[], status: boolean) {
  //   return this.httpClient.put<Dish[] | any>(
  //     `http://localhost:3000/dish/allstatus?status=${status}`, {ids}
  //   );
  // }
}
