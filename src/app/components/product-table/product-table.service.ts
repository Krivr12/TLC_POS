import { Injectable } from '@angular/core';
import { ProductApi, Product } from '../../apis/products';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductTableService {
  constructor(private productApi: ProductApi) {}

  getProducts(): Observable<Product[]> {
    return this.productApi.getAll();
  }
}
