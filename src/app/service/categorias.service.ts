import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {


  private baseURL: string = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {}

  // Método para registrar una nueva categoría
  public registerCategory(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.post<any>(`${this.baseURL}/register`, null, { params });
  }

  // Método para obtener todas las categorías
  public getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/all`);
  }

  // Método para eliminar una categoría por ID
  public deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/delete/${categoryId}`);
  }

  // Método para obtener una categoría por ID
  public getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${id}`);
  }

  // Método para obtener todas las categorías con paginación y ordenamiento
  public getAllCategoriesPaginated(
    numPag: number = 0,
    field: string = 'name',
    pageSize: number = 3,
    sortDirec: string = 'asc'
  ): Observable<any> {
    const params = new HttpParams()
      .set('numPag', numPag.toString())
      .set('field', field)
      .set('pageSize', pageSize.toString())
      .set('sortDirec', sortDirec);
    return this.http.get<any>(`${this.baseURL}/all-pag`, { params });
  }

  // Método para actualizar una categoría por ID
  public updateCategory(id: number, name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.put<any>(`${this.baseURL}/update/${id}`, null, { params });
  }

}
