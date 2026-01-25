import { Injectable } from '@angular/core';
import { AuthApi } from './auth.api';
import { tap } from 'rxjs/operators';

const TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authApi: AuthApi) {}

  login(email: string, password: string) {
    return this.authApi.login(email, password).pipe(
      tap((res) => {
        if (res?.access_token) {
          localStorage.setItem(TOKEN_KEY, res.access_token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
