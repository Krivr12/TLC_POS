import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductTag {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ProductTagApi {
  private apiUrl = 'http://localhost:5000/product-tags';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductTag[]> {
    return this.http.get<ProductTag[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProductTag> {
    return this.http.get<ProductTag>(`${this.apiUrl}/${id}`);
  }

  create(data: Partial<ProductTag>): Observable<ProductTag> {
    return this.http.post<ProductTag>(this.apiUrl, data);
  }

  update(id: number, data: Partial<ProductTag>): Observable<ProductTag> {
    return this.http.put<ProductTag>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
