import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { csvToElementArray } from '../utils/csv-parser.util';
import { ProductTableItem } from './product-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductTableItem[]> {
  return this.http.get('/assets/products_sample.csv', { responseType: 'text' }).pipe(
    switchMap(csvString => {
      console.log('CSV String:', csvString);
      return csvToElementArray(csvString);
    })
  );
}

}
