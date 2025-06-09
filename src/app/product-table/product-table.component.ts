import { AfterViewInit, Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ProductTableDataSource, ProductTableItem } from './product-table-datasource';
import { CommonModule } from '@angular/common';
import { ProductDataService } from './product-data.service';
import { ProductShareService } from '../utils/product-share.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule]
})
export class ProductTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductTableItem>;

  dataSource!: ProductTableDataSource;

  displayedColumns = ['ProductName', 'ProductID', 'VariantGroupID', 'SKU', 'CategoryID'];
 
  constructor(
    private productDataService: ProductDataService,
    private productShareService: ProductShareService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    // Initialize the data source
    this.dataSource = new ProductTableDataSource(this.productDataService);
  }

  ngAfterViewInit(): void {
    // Set up paginator and sort after view initialization
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    // Check for shared product data and add it to the table
    const product = this.productShareService.getProduct();
    if (product) {
      console.log('Received product data:', product);
      // Try to add immediately - the datasource will handle queueing if needed
      this.dataSource.addProduct(product);
      
      // Also try to add after a delay as backup
      setTimeout(() => {
        if (!this.dataSource.isInitialDataLoaded()) {
          console.log('Retrying to add product after delay');
          this.dataSource.addProduct(product);
        }
      }, 2000);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file.name);
      // Add your file processing logic here
    }
  }

  // Optional: Method to manually add a product (useful for testing or other use cases)
  addNewProduct(product: ProductTableItem): void {
    this.dataSource.addProduct(product);
    // Update paginator length
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.length = this.dataSource.data.length;
      }
    });
  }

  // Method to update paginator length manually
  updatePaginatorLength(): void {
    if (this.paginator) {
      this.paginator.length = this.dataSource.data.length;
    }
  }

  // Debug method to test adding products
  debugAddProduct(): void {
    const testProduct: ProductTableItem = {
      ProductName: 'Debug Test Product',
      ProductID: 9999,
      VariantGroupID: 'DEBUG123',
      SKU: 'DEBUG-SKU',
      CategoryID: 'DEBUG-CAT'
    };
    
    console.log('Before adding debug product:', this.dataSource.data.length);
    console.log('Initial data loaded:', this.dataSource.isInitialDataLoaded());
    this.dataSource.addProduct(testProduct);
    
    setTimeout(() => {
      console.log('After adding debug product:', this.dataSource.data.length);
      this.updatePaginatorLength();
    }, 100);
  }
}