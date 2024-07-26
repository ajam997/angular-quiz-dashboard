import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSearchChange(query: string): void {
    if (query) {
      this.userService.getUserById(+query).subscribe(user => {
        if (user) {
          this.router.navigate(['/user', user.id]);
        }
      });
    }
  }
}
