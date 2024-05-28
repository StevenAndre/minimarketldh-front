import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  private baseURLCategorySuppliers= "http://localhost:8080/categories-supplier";

  constructor(private http: HttpClient) { }

  registerCategorySupplier(description: string): Observable<any> {
    return this.http.post<any>(`${this.baseURLCategorySuppliers}/register`, { description });
  }

  getAllCategorySupplier(): Observable<any> {
    return this.http.get<any>(`${this.baseURLCategorySuppliers}/all`);
  }

  deleteCategorySupplier(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURLCategorySuppliers}/delete/${id}`);
  }
}
