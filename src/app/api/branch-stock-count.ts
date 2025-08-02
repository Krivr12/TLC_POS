import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BranchStockCount {
  id: number;
  branch_id: number;
  product_id: number;
  quantity: number;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class BranchStockCountApi {
  private apiUrl = 'http://localhost:5000/branchstockcounts/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BranchStockCount[]> {
    return this.http.get<BranchStockCount[]>(this.apiUrl);
  }

  getById(id: number): Observable<BranchStockCount> {
    return this.http.get<BranchStockCount>(`${this.apiUrl}/${id}`);
  }

  create(data: Partial<BranchStockCount>): Observable<BranchStockCount> {
    return this.http.post<BranchStockCount>(this.apiUrl, data);
  }

  update(
    id: number,
    data: Partial<BranchStockCount>
  ): Observable<BranchStockCount> {
    return this.http.put<BranchStockCount>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
