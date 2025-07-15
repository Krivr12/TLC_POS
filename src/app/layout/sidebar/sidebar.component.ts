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
