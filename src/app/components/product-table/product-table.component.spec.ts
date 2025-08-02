import { Component, OnInit } from '@angular/core';
import { Product } from '../../api/products';
import { ProductTableService } from './product-table.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [
    'ProductName',
    'ProductID',
    'VariantGroupID',
    'SKU',
    'CategoryID',
  ];

  constructor(private productService: ProductTableService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
