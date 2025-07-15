import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, startWith } from 'rxjs/operators';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { ProductDataService } from './product-data.service';

// Define the model
export interface ProductTableItem {
  ProductName: string;
  ProductID: number;
  VariantGroupID: string;
  SKU: string;
  CategoryID: string;
}

export class ProductTableDataSource extends DataSource<ProductTableItem> {
  private _data = new BehaviorSubject<ProductTableItem[]>([]);
  private _dataValue: ProductTableItem[] = [];
  private _initialDataLoaded = false;
  private _pendingProducts: ProductTableItem[] = [];

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private productDataService: ProductDataService) {
    super();
    // Load initial data from service
    this.loadInitialData();
  }

  get data(): ProductTableItem[] {
    return this._dataValue;
  }

  private loadInitialData(): void {
    this.productDataService.getProducts().subscribe((data: any[]) => {
      // Map backend fields to frontend model
      const mapped = data.map((item) => ({
        ProductID: item.id,
        ProductName: item.name,
        VariantGroupID: item.variant_group_id,
        SKU: item.sku,
        CategoryID: item.category_id,
      }));
      this._dataValue = mapped;

      // Add any pending products that were added before initial data loaded
      if (this._pendingProducts.length > 0) {
        this._dataValue = [...this._dataValue, ...this._pendingProducts];
        this._pendingProducts = [];
      }

      this._initialDataLoaded = true;
      this._data.next(this._dataValue);
      console.log('Final data after loading:', this._dataValue);
    });
  }

  // Method to add a new product to the existing data
  addProduct(product: ProductTableItem): void {
    if (!this._initialDataLoaded) {
      // If initial data hasn't loaded yet, queue the product
      console.log('Initial data not loaded yet, queueing product:', product);
      this._pendingProducts.push(product);
      return;
    }

    this._dataValue = [...this._dataValue, product];
    this._data.next(this._dataValue);
    console.log('Product added to loaded data. Current data:', this._dataValue);
  }

  // Method to add multiple products
  addProducts(products: ProductTableItem[]): void {
    if (!this._initialDataLoaded) {
      console.log('Initial data not loaded yet, queueing products:', products);
      this._pendingProducts.push(...products);
      return;
    }

    this._dataValue = [...this._dataValue, ...products];
    this._data.next(this._dataValue);
    console.log('Products added. Current data:', this._dataValue);
  }

  // Method to remove a product
  removeProduct(productId: number): void {
    this._dataValue = this._dataValue.filter(
      (product) => product.ProductID !== productId
    );
    this._data.next(this._dataValue);
  }

  // Method to update the entire dataset
  updateData(data: ProductTableItem[]): void {
    this._dataValue = data;
    this._data.next(this._dataValue);
    this._initialDataLoaded = true;
  }

  // Method to check if initial data is loaded
  isInitialDataLoaded(): boolean {
    return this._initialDataLoaded;
  }

  connect(): Observable<ProductTableItem[]> {
    // Create array of observables that should trigger table updates
    const dataMutations: Observable<unknown>[] = [this._data.asObservable()];

    if (this.paginator) {
      dataMutations.push(this.paginator.page.pipe(startWith(null)));
    }
    if (this.sort) {
      dataMutations.push(this.sort.sortChange.pipe(startWith(null)));
    }

    return merge(...dataMutations).pipe(
      map(() => {
        const sortedData = this.getSortedData([...this._dataValue]);
        const pagedData = this.getPagedData(sortedData);
        console.log('Rendering data:', pagedData.length, 'items');
        return pagedData;
      })
    );
  }

  disconnect(): void {
    this._data.complete();
  }

  private getPagedData(data: ProductTableItem[]): ProductTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.slice(startIndex, startIndex + this.paginator.pageSize);
    }
    return data;
  }

  private getSortedData(data: ProductTableItem[]): ProductTableItem[] {
    if (!this.sort?.active || !this.sort?.direction) {
      return data;
    }

    const isAsc = this.sort.direction === 'asc';
    return data.sort((a, b) => {
      switch (this.sort!.active) {
        case 'ProductName':
          return compare(a.ProductName, b.ProductName, isAsc);
        case 'ProductID':
          return compare(+a.ProductID, +b.ProductID, isAsc);
        case 'VariantGroupID':
          return compare(a.VariantGroupID, b.VariantGroupID, isAsc);
        case 'SKU':
          return compare(a.SKU, b.SKU, isAsc);
        case 'CategoryID':
          return compare(a.CategoryID, b.CategoryID, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
