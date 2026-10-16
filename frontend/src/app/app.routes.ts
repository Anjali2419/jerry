import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { EmployeesComponent } from './components/employees/employees';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
