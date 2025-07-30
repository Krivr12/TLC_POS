import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Branch {
  id: number;
  name: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class BranchApi {
  private apiUrl = 'http://127.0.0.1:5000/branches/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }

  getById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/${id}`);
  }

  create(data: Partial<Branch>): Observable<Branch> {
    return this.http.post<Branch>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Branch>): Observable<Branch> {
    return this.http.put<Branch>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
