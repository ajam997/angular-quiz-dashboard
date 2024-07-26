import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private userCache = new Map<number, User>();
  private userListCache = new Map<number, User[]>();

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<User[]> {
    if (this.userListCache.has(page)) {
      return of(this.userListCache.get(page) as User[]);
    } else {
      return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
        map(response => response.data),
        tap(users => this.userListCache.set(page, users))
      );
    }
  }

  getUserById(id: number): Observable<User> {
    const cachedUser = this.userCache.get(id);
    if (cachedUser) {
      return of(cachedUser);
    } else {
      return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
        map(response => response.data),
        tap(user => this.userCache.set(id, user))
      );
    }
  }
}
