import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {
  private baseURL: string = 'http://localhost:8080/units';

  constructor(private http: HttpClient) {}

  // Método para registrar una nueva unidad
  public registerUnit(description: string): Observable<any> {
    const params = new HttpParams().set('description', description);
    return this.http.post<any>(`${this.baseURL}/register`, null, { params });
  }

  // Método para obtener todas las unidades
  public getAllUnits(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/all`);
  }

  // Método para eliminar una unidad por ID
  public deleteUnit(unitId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/delete/${unitId}`);
  }

  // Método para obtener una unidad por ID
  public getUnitById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${id}`);
  }

  // Método para obtener todas las unidades con paginación y ordenamiento
  public getAllUnitsPaginated(
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

  // Método para actualizar una unidad por ID
  public updateUnit(id: number, description: string): Observable<any> {
    const params = new HttpParams().set('description', description);
    return this.http.put<any>(`${this.baseURL}/update/${id}`, null, { params });
  }
}
