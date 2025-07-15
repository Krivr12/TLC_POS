import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductTableItem } from '../services/product-table-datasource';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  private apiUrl = 'http://localhost:5000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductTableItem[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`).pipe(
      map((data) =>
        data.map((item) => ({
          ProductID: item.id,
          ProductName: item.name,
          VariantGroupID: item.variant_group_id,
          SKU: item.sku,
          CategoryID: item.category_id,
        }))
      )
    );
  }
}
