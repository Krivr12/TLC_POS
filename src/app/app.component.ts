import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, MatTableModule],
  template: `
    <div class="flex">
      <app-sidebar />
      <div class="flex-1 ml-[320px]">
        <app-header />
        <router-outlet />
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
}
