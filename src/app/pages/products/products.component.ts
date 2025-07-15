import { Component, OnInit } from '@angular/core';
import { ProductTableComponent } from '../../product-table/product-table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductTableComponent, CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  activeLink = 'products';

  ngOnInit(): void {
    this.activeLink = localStorage.getItem('activeLink') ?? 'products';
  }

  ClickLinkHandler(link: string) {
    this.activeLink = link;
    localStorage.setItem('activeLink', link);
    // No overlay logic, no preventDefault
  }
}
