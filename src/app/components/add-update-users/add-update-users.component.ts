import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../shared/service/api.service';
import { NotificationService } from '../../shared/service/notification.service';
import { SpinnerService } from '../../shared/service/spinner.service';

@Component({
  selector: 'app-add-update-users',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './add-update-users.component.html',
  styleUrl: './add-update-users.component.scss',
})
export class AddUpdateUsersComponent implements OnInit {
  userForm: FormGroup;
  userId: any;
  title: string = 'Create User';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService,
    private spinner: SpinnerService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.userId) {
      this.title = 'Update User';
      this.getUser(this.userId);
    }
  }

  getUser(id: any) {
    this.spinner.show();
    this.apiService.getUserById(id).subscribe({
      next: (res: any) => {
        this.userForm.patchValue({
          ...res,
        });
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
        this.notification.showError(error?.message);
      },
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userPayload = {
      ...this.userForm.value,
    };

    if (this.userId) {
      this.apiService.updateUser(this.userId, userPayload).subscribe({
        next: (res: any) => {
          this.notification.showSuccess('User updated successfully.');
          this.router.navigate(['/users']);
        },
        error: (error: any) => {
          this.notification.showError(error?.message);
        },
      });
    } else {
      this.apiService.createUser(userPayload).subscribe({
        next: (res: any) => {
          this.notification.showSuccess('User created successfully.');
          this.router.navigate(['/users']);
        },
        error: (error: any) => {
          this.notification.showError(error?.message);
        },
      });
    }
  }
}
