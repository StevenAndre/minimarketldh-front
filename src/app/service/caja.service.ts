import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  cajaID:WritableSignal<number>=signal(1);
  
  private baseURL: string = 'http://localhost:8080/cash';

  constructor(private http: HttpClient) { }


  public createCash(cashRequest: CashRequest): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/create`, cashRequest);
  }

  public updateCash(id: number, location: string, name: string ,number: number): Observable<any> {
    const params = new HttpParams()
      .set('name', name)
      .set('location', location)
      .set('number', number.toString());
    return this.http.put<any>(`${this.baseURL}/update/${id}`, null, { params });
  }

  
  public listAllCash(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/all`);
  }


  public getCashById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${id}`);
  }


  public deleteCash(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/delete/${id}`);
  }
}


export interface CashRequest {
  name:string;
  location: string;
  number: number;
}
