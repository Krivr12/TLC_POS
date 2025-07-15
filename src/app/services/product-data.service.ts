import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductTableItem } from './product-table-datasource';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  private apiUrl = 'http://localhost:5000/products'; // Adjust if Flask runs elsewhere

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<ProductTableItem[]> {
    return this.http.get<ProductTableItem[]>(`${this.apiUrl}/`);
  }

  // Get a single product by ID
  getProduct(id: number): Observable<ProductTableItem> {
    return this.http.get<ProductTableItem>(`${this.apiUrl}/${id}`);
  }

  // Create a new product
  createProduct(product: Partial<ProductTableItem>): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, product);
  }

  // Update an existing product
  updateProduct(
    id: number,
    product: Partial<ProductTableItem>
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
