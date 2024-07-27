import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = of([]);
  allUsers$: Observable<User[]> = of([]); // Observable to store all users
  currentPage = 1;
  totalPages = 1;
  searchTerm: string = '';
  showPaginator = true;
  private usersCache: User[] = []; // Cache all users

  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    // Load all users initially
    this.loadAllUsers();

    this.sharedService.searchTerm$.pipe(
      distinctUntilChanged(),
      switchMap(term => {
        this.searchTerm = term;
        this.showPaginator = !term; // Show paginator only if no search term
        if (term) {
          return this.searchUsers(term);
        } else {
          return this.loadUsers(this.currentPage);
        }
      })
    ).subscribe(users => {
      this.users$ = of(users);
    });
  }

  loadUsers(page: number): Observable<User[]> {
    return this.userService.getUsers(page).pipe(
      tap(result => {
        // Only add new users if they are not already in cache
        this.usersCache = [...new Map(this.usersCache.map(user => [user.id, user])).values(), ...result.users];
        this.totalPages = Math.ceil(result.total / 6);
      }),
      map(() => {
        // Return users for the current page
        return this.usersCache.slice((page - 1) * 6, page * 6);
      })
    );
  }

  searchUsers(term: string): Observable<User[]> {
    // Filter users from cache based on search term
    const filteredUsers = this.usersCache.filter(user =>
      user.first_name.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredUsers);
  }

  loadAllUsers(): void {
    // Fetch users page by page and accumulate results
    this.userService.getUsers(1).subscribe(result => {
      this.usersCache = result.users;
      const totalPages = Math.ceil(result.total / 6);
      for (let page = 2; page <= totalPages; page++) {
        this.userService.getUsers(page).subscribe(res => {
          this.usersCache = [...new Map(this.usersCache.map(user => [user.id, user])).values(), ...res.users];
        });
      }
    });
  }

  viewUser(id: number): void {
    this.router.navigate([`/user/${id}`]);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers(page).subscribe(users => {
      this.users$ = of(users);
    });
  }
}
