import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private baseURL: string = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) { }

  public createTransaction(openingID: string, amount: number, type: number): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('type', type.toString());
    return this.http.post<any>(`${this.baseURL}/create/${openingID}`, null, { params });
  }

  public listAllTransactionsByOpening(openingID: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/opening/${openingID}`);
  }
}
