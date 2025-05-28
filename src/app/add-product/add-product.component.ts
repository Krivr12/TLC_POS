import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  activeLink: string = 'products';
  ClickLinkHandler(link: string) {
      this.activeLink = link;
      localStorage.setItem('activeLink', link);
      // No overlay logic, no preventDefault
    }
}