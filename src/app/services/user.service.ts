import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  // Fetch users with pagination
  getUsers(page: number): Observable<{ users: User[], total: number }> {
    return this.http.get<{ data: User[], total: number }>(`${this.apiUrl}?page=${page}`).pipe(
      map(response => ({ users: response.data, total: response.total }))
    );
  }

  // Fetch all users without pagination (if applicable)
  getAllUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  // Fetch a user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<{ data: User }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
