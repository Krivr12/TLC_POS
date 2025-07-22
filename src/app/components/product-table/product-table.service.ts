import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  variant_group_id: string;
  sku: string;
  category_id: string;
}

@Injectable({ providedIn: 'root' })
export class ProductTableService {
  private apiUrl = 'http://localhost:5000/products/'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
