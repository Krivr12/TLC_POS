import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tag {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class TagApi {
  private apiUrl = 'http://localhost:5000/tags';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }

  getById(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}/${id}`);
  }

  create(data: Partial<Tag>): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Tag>): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
