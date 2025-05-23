import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, MatTableModule],
  template: `
    <div class="app-container">
      <app-sidebar />
      
      <div class="content-area">
        <main>
          <app-header />
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      top : 0;
    }
    .content-area {
      flex: 1;
      margin-left: 320px; /* Should match sidebar width */
  
    }
    @media screen and (max-width: 1500px) {
      .content-area {
        margin-left: 80px; /* Should match sidebar width */
      }
    }
    @media screen and (min-width: 1501px) {
      .content-area {
        margin-left: 310px; /* Should match sidebar width */
      }
    }  
    `]
  })
export class AppComponent {
  // Your component logic goes here
}