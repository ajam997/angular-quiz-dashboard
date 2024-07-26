import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user!: User;

  constructor(private router: Router) {}

  viewUserDetails(): void {
    this.router.navigate(['/user', this.user.id]);
  }
}
