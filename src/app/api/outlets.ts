export interface ProductOutletPrice {
  product_id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ProductOutletPriceApi {
  private apiUrl = 'http://localhost:5000/outlets';

  constructor(private http: HttpClient) {}

  create(data: ProductOutletPrice): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Outlet {
  id: number;
  name: string;
  address: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class OutletApi {
  private apiUrl = 'http://localhost:5000/outlets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Outlet[]> {
    return this.http.get<Outlet[]>(this.apiUrl);
  }

  getById(id: number): Observable<Outlet> {
    return this.http.get<Outlet>(`${this.apiUrl}/${id}`);
  }

  create(data: Partial<Outlet>): Observable<Outlet> {
    return this.http.post<Outlet>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Outlet>): Observable<Outlet> {
    return this.http.put<Outlet>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
