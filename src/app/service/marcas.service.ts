import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  private baseURL: string = 'http://localhost:8080/brands';

  constructor(private http: HttpClient) {}

  // Método para registrar una nueva marca
  public registerBrand(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.post<any>(`${this.baseURL}/register`, null, { params });
  }

  // Método para obtener todas las marcas
  public getAllBrands(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/all`);
  }

  // Método para eliminar una marca por ID
  public deleteBrand(brandId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/delete/${brandId}`);
  }

  // Método para obtener una marca por ID
  public getBrandById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${id}`);
  }

  // Método para obtener todas las marcas con paginación y ordenamiento
  public getAllBrandsPaginated(
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

  // Método para actualizar una marca por ID
  public updateBrand(id: number, name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.put<any>(`${this.baseURL}/update/${id}`, null, { params });
  }
}
