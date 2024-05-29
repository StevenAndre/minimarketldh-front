import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  private baseURLCategorySuppliers= "http://localhost:8080/categories-supplier";

  constructor(private http: HttpClient) { }

  public registerCategorySupplier(description: string): Observable<any> {
    const params = new HttpParams()
      .set('description', description);
    
    return this.http.post<any>(`${this.baseURLCategorySuppliers}/register`, null,{params:params});
  }

  getAllCategorySupplier(): Observable<any> {
    return this.http.get<any>(`${this.baseURLCategorySuppliers}/all`);
  }

  deleteCategorySupplier(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURLCategorySuppliers}/delete/${id}`);
  }

  public getAllCategorySuppliersPaginated(numPag: number = 0, field: string = 'description', pageSize: number = 3, sortDirec: string = 'asc'): Observable<any> {
    const params = new HttpParams()
      .set('numPag', numPag.toString())
      .set('field', field)
      .set('pageSize', pageSize.toString())
      .set('sortDirec', sortDirec);

    return this.http.get<any>(`${this.baseURLCategorySuppliers}/all-pag`, { params });
  }

  public updateCategorySupplier(id: number, description: string): Observable<any> {
    const params = new HttpParams().set('description', description);
    return this.http.put<any>(`${this.baseURLCategorySuppliers}/update/${id}`, null, { params });
  }
  
  // Método para obtener un Rubro por su ID
  public getCategorySupplierById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURLCategorySuppliers}/${id}`);
  }


}
