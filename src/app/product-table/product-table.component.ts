import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ProductTableDataSource, ProductTableItem } from './product-table-datasource';
import { CommonModule } from '@angular/common';
import { ProductDataService } from './product-data.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule]
})
export class ProductTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductTableItem>;



  dataSource!: ProductTableDataSource;

  displayedColumns = ['id', 'name'];

  constructor(private productDataService: ProductDataService) {}

  ngOnInit(): void {
  this.dataSource = new ProductTableDataSource(this.productDataService);
}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    console.log("table components")
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file.name);
      // Add your file processing logic here
    }
  }
}


