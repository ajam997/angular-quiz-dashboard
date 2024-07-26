import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  currentPage = 1;
  totalPages = 1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number): void {
    this.users$ = this.userService.getUsers(page).pipe(
      map(users => {
        // Set the total number of pages if needed
        this.totalPages = Math.ceil(users.length / 6); // Example calculation
        return users;
      })
    );
  }

  viewUser(id: number): void {
    this.router.navigate([`/user/${id}`]);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers(page);
  }
}
