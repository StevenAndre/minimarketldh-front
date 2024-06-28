import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AperturaService {
  private baseURL: string = 'http://localhost:8080/opening-cash';

  constructor(private http: HttpClient) { }


  public openCash(cashID: number, initialAmount: number): Observable<any> {
    const params = new HttpParams().set('initialAmount', initialAmount.toString());
    return this.http.post<any>(`${this.baseURL}/open/${cashID}`, null, { params });
  }


  public closeCash(openingID: string, finalAmount: number): Observable<any> {
    const params = new HttpParams().set('finalAmount', finalAmount.toString());
    return this.http.put<any>(`${this.baseURL}/close/${openingID}`, null, { params });
  }

 
  public editOpening(openingID: string, initialAmount: number): Observable<any> {
    const params = new HttpParams().set('initialAmount', initialAmount.toString());
    return this.http.put<any>(`${this.baseURL}/edit/${openingID}`, null, { params });
  }


  public getOpeningByID(openingID: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${openingID}`);
  }

  
  public getAllOpenings(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/all`);
  }

 
  public getAllOpeningsByCash(cashID: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/cash/${cashID}`);
  }

  public getOpeningCashActiveToday(cashID: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/cash-active/${cashID}`);
  }

}


export interface OpeningCash{

    id: string;
    initial_amount: number;
    final_amount: number;
    date: string; 
    time: string; 
    user: any;
    status: string;
  
}