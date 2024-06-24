import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { New } from '../../models/new.model';

@Injectable({
  providedIn: 'root',
})
export class NewService {
  constructor(private httpClient: HttpClient) {}
// Get all news
  getNew() {
    return this.httpClient.get<New[] | any>('http://localhost:3000/new/get-all');
  }

//   createNew() { 
//     return this.httpClient.post<New[] | any>('http://localhost:3000/new/create', new);
//   }


  // removeNew(dId: string) {
  //   return this.httpClient.delete(
  //     `http://localhost:3000/New/delete?=id/${dId}`
  //   );
  // }

  // updateNew(new: any) {
  //   return this.httpClient.put<New[] | any>(
  //     `http://localhost:3000/new/update/${dish.dId}`, new
  //   );
  // }

  // confirmNew(dId: string) {
  //   return this.httpClient.put<New[] | any>(
  //     `http://localhost:3000/new/confirm/${dId}`, {status: true}
  //   );
  // }

  // updateStatusAll( ids: string[], status: boolean) {
  //   return this.httpClient.put<New[] | any>(
  //     `http://localhost:3000/new/allstatus?status=${status}`, {ids}
  //   );
  // }
}
