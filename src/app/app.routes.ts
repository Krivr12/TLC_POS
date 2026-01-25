import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'employees',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/employees/employees.component').then(
        (m) => m.EmployeesComponent
      ),
  },
  {
    path: 'inventory',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/inventory/inventory.component').then(
        (m) => m.InventoryComponent
      ),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/settings/settings.component').then(
        (m) => m.SettingsComponent
      ),
  },
  {
    path: 'suppliers',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/suppliers/suppliers.component').then(
        (m) => m.SuppliersComponent
      ),
  },
  {
    path: 'transactions',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/transactions/transactions.component').then(
        (m) => m.TransactionComponent
      ),
  },
  {
    path: 'add-product',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/add-product/add-product.component').then(
        (m) => m.AddProductComponent
      ),
  },
];
