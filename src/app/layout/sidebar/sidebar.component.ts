import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Add CommonModule to imports
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  sidebarLinks = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'assets/icons/dashboard.png',
      activeIcon: 'assets/icons/dashboard-active.png',
    },
    {
      key: 'products',
      label: 'Products',
      route: '/products',
      icon: 'assets/icons/products.png',
      activeIcon: 'assets/icons/products-active.png',
    },
    {
      key: 'suppliers',
      label: 'Suppliers',
      route: '/suppliers',
      icon: 'assets/icons/suppliers.png',
      activeIcon: 'assets/icons/suppliers-active.png',
    },
    {
      key: 'employees',
      label: 'Employees',
      route: '/employees',
      icon: 'assets/icons/employees.png',
      activeIcon: 'assets/icons/employees-active.png',
    },
    {
      key: 'inventory',
      label: 'Inventory',
      route: '/inventory',
      icon: 'assets/icons/inventory.png',
      activeIcon: 'assets/icons/inventory-active.png',
    },
    {
      key: 'transactions',
      label: 'Transactions',
      route: '/transactions',
      icon: 'assets/icons/transactions.png',
      activeIcon: 'assets/icons/transactions-active.png',
    },
    {
      key: 'settings',
      label: 'Settings',
      route: '/settings',
      icon: 'assets/icons/settings.png',
      activeIcon: 'assets/icons/settings-active.png',
    },
    {
      key: 'logout',
      label: 'Logout',
      route: '/logout',
      icon: 'assets/icons/logout.png',
      activeIcon: 'assets/icons/logout-active.png',
    },
  ];

  // Track the currently active link
  activeLink = 'dashboard'; // Default to 'dashboard'

  ngOnInit() {
    // Get active link from localStorage if available
    this.activeLink = localStorage.getItem('activeLink') || 'dashboard';
  }

  // Click handler to update active link
  ClickLinkHandler(event: Event, link: string) {
    event.preventDefault(); // Prevent default anchor behavior
    this.activeLink = link;

    // Store active link in localStorage to persist after page refresh
    localStorage.setItem('activeLink', link);
  }
}
