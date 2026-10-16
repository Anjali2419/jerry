import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class EmployeesComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  employees: Employee[] = [];
  form: Employee = this.emptyEmployee();
  editingId: number | null = null;
  errorMessage = '';

  ngOnInit(): void {
    this.loadEmployees();
  }

  emptyEmployee(): Employee {
    return {
      employeeName: '',
      email: '',
      department: '',
      salary: 0
    };
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: data => this.employees = data,
      error: () => this.errorMessage = 'Could not load employees.'
    });
  }

  saveEmployee(): void {
    this.errorMessage = '';

    const request = this.editingId === null
      ? this.employeeService.create(this.form)
      : this.employeeService.update(this.editingId, this.form);

    request.subscribe({
      next: () => {
        this.form = this.emptyEmployee();
        this.editingId = null;
        this.loadEmployees();
      },
      error: () => {
        this.errorMessage = 'Unable to save employee details.';
      }
    });
  }

  editEmployee(employee: Employee): void {
    this.form = { ...employee };
    this.editingId = employee.id ?? null;
  }

  deleteEmployee(id: number | undefined): void {
    if (id === undefined || !confirm('Delete this employee?')) {
      return;
    }

    this.employeeService.delete(id).subscribe({
      next: () => this.loadEmployees(),
      error: () => this.errorMessage = 'Unable to delete employee.'
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
