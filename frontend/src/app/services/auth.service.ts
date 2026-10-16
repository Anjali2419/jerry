import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly apiUrl = '/api/auth';

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap(response => {
        sessionStorage.setItem('auth_token', response.token);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
