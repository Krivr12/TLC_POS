import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private baseUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }
}
