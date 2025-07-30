import { Injectable } from '@angular/core';
import { ProductApi } from '../../apis/products';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductTableService {
  constructor(private productApi: ProductApi) {}

  getProducts() {
    return this.productApi.getAll();
  }
}
