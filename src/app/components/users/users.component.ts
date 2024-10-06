import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { RouterModule } from '@angular/router';
import { SpinnerService } from '../../shared/service/spinner.service';
import { NotificationService } from '../../shared/service/notification.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(
    private apiService: ApiService,
    private spinner: SpinnerService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.spinner.show();
    this.apiService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response;
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
        this.notification.showError(error?.message);
      },
    });
  }

  deleteUser(userId: any) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== userId);
          this.notification.showSuccess('User deleted successfully.');
        },
        error: (err: any) => {
          this.notification.showError(err?.message);
        },
      });
    }
  }
}
