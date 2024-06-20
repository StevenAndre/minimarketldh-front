import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaSdocumentoService {

  constructor(private http:HttpClient) { }

  private urlRENIEC = "http://localhost:8080/dni-ruc";
  private urlSUNAT = "http://localhost:8080/dni-ruc/ruc";

  consultarDNI(dni: string): Observable<any> {
    
    return this.http.get(`${this.urlRENIEC}/${dni}`);
  }

  consultarRUC(ruc: string): Observable<any> {
    
    return this.http.get(`${this.urlSUNAT}/${ruc}`);
  }

}
