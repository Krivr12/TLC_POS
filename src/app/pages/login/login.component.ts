import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow w-full max-w-sm">
        <h1 class="text-xl font-bold mb-4">Login</h1>
        <form (ngSubmit)="onSubmit()" #f="ngForm">
          <input
            class="border rounded w-full p-2 mb-3"
            type="email"
            name="email"
            [(ngModel)]="email"
            placeholder="Email"
            required
          />
          <input
            class="border rounded w-full p-2 mb-4"
            type="password"
            name="password"
            [(ngModel)]="password"
            placeholder="Password"
            required
          />
          <button
            class="bg-[#634941] text-white w-full py-2 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
        <p class="text-sm text-gray-500 mt-3">
          Use a seeded user email/password.
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) => alert('Login failed'),
    });
  }
}
