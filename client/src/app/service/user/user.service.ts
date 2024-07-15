import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user'; // Thay bằng URL của API thực tế của bạn

  constructor(private httpClient: HttpClient) { }

  // Get user by email
  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${email}`);
  }

  // Get user by email and password
  getUserByEmailAndPassword(email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/login`, { email, password });
  }

  // Create user
  createUser(newUser: any): Observable<User> {
    const user = {
      uid: newUser.uid,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      avatar: newUser.avatar,
      address: newUser.address,
      role: 'user',
      password: newUser.password,
    };
    return this.httpClient.post<User>(`${this.apiUrl}/create`, user);
  }
}
