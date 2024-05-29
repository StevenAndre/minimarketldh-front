import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private baseUrl = 'http://localhost:8080/purchases';

  constructor(private http: HttpClient) { }

  registerPurchase(purchaseRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, purchaseRequest);
  }

  deletePurchase(purchaseID: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${purchaseID}`);
  }

  getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.baseUrl}/all`);
  }

  getAllPurchasesPaginated(numPag: number, field: string, pageSize: number, sortDirec: string): Observable<any> {
    const params = {
      numPag: numPag.toString(),
      field: field,
      pageSize: pageSize.toString(),
      sortDirec: sortDirec
    };
    return this.http.get<any>(`${this.baseUrl}/all-pag`, { params });
  }

  getDetailsByPurchase(purchaseID: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/details/${purchaseID}`);
  }
}
export interface PurchaseRequest {
  // Define las propiedades según tu API
  productId: string;
  quantity: number;
  // Otros campos
}

// purchase.model.ts
export interface Purchase {
  id: string;
  productId: string;
  quantity: number;
  date: string;
  // Otros campos
}

export interface PurchaseDto {
  purchase_id: string;
  description: string;
  total: number;
  purchase_date: Date;
  type_payment: string;
  supplier: any;
  user: any;
}

