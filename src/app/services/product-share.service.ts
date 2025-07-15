import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductShareService {
  private productData: any;

  setProduct(data: any) {
    this.productData = data;
  }

  getProduct(): any {
    return this.productData;
  }
}
