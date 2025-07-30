import { Component, OnInit } from '@angular/core';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { PageNavigatorComponent } from '../../components/page-navigator/page-navigator.component';
import { ProductTableService } from '../../components/product-table/product-table.service';
import { Product } from '../../apis/products';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductTableComponent,
    PageNavigatorComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  activeLink = 'products';

  products: Product[] = [];
  pagedProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 20;
  totalPages: number = 1;

  constructor(private productService: ProductTableService) {}

  ngOnInit(): void {
    this.activeLink = localStorage.getItem('activeLink') ?? 'products';
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
      this.setPagedProducts();
    });
  }

  setPagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.products.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPagedProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPagedProducts();
    }
  }

  ClickLinkHandler(link: string) {
    this.activeLink = link;
    localStorage.setItem('activeLink', link);
    // No overlay logic, no preventDefault
  }
}
