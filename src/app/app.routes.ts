import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { AddUpdateUsersComponent } from './components/add-update-users/add-update-users.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'create', component: AddUpdateUsersComponent },
  { path: 'update/:id', component: AddUpdateUsersComponent },
];
