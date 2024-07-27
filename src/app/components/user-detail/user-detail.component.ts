import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User | undefined;
  private routeSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? +idParam : 0;
      this.getUser(id);
    });
  }

  getUser(id: number): void {
    this.userService.getUserById(id).subscribe(
      (user: User | undefined) => {
        if (user) {
          this.user = user;
        } else {
          this.router.navigate(['/']);
        }
      },
      error => {
        console.error('Error fetching user details:', error);
        this.router.navigate(['/']);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
