import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
        },
    },
    {
        path: 'dashboard',
        loadComponent: () => {
            return import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
        },
    },
    {
        path: 'products',
        loadComponent: () => {
            return import('./products/products.component').then(m => m.ProductsComponent)
        },
    },
    {
        path: 'employees',
        loadComponent: () => {
            return import('./employees/employees.component').then(m => m.EmployeesComponent)
        },
    },
    {
        path: 'inventory',
        loadComponent: () => {
            return import('./inventory/inventory.component').then(m => m.InventoryComponent)
        },
    },
    {
        path: 'settings',
        loadComponent: () => {
            return import('./settings/settings.component').then(m => m.SettingsComponent)
        },
    },
    {
        path: 'suppliers',
        loadComponent: () => {
            return import('./suppliers/suppliers.component').then(m => m.SuppliersComponent)
        },
    },
    {
        path: 'transaction',
        loadComponent: () => {
            return import('./transaction/transaction.component').then(m => m.TransactionComponent)
        },
    },

];

