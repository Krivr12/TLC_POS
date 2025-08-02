import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  sidebarLinks = [
    { key: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { key: 'products', label: 'Products', route: '/products' },
    { key: 'suppliers', label: 'Suppliers', route: '/suppliers' },
    { key: 'employees', label: 'Employees', route: '/employees' },
    { key: 'inventory', label: 'Inventory', route: '/inventory' },
    { key: 'transactions', label: 'Transactions', route: '/transactions' },
    { key: 'settings', label: 'Settings', route: '/settings' },
    { key: 'logout', label: 'Logout', route: '/logout' },
  ];

  materialIconNames = [
    'dashboard',
    'shopping_bag',
    'local_shipping',
    'group',
    'stacks',
    'payments',
    'settings',
    'logout',
  ];

  getMaterialIconName(index: number): string {
    return this.materialIconNames[index] || 'dashboard';
  }

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
