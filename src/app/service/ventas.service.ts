import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private baseURL: string = 'http://localhost:8080/sales';

  constructor(private http: HttpClient) { }

  public registerSale(saleRequest: SaleRequest): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/register`, saleRequest);
  }

  public getSaleByID(saleID: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${saleID}`);
  }

  public cancelSale(saleID: string): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/cancel/${saleID}`, null);
  }

  public getAllSales(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/all`);
  }

  public getAllSalesPaginated(
    field: string = 'date',
    pageNum: number = 0,
    sizePages: number = 10,
    sortDirec: string = 'asc'
  ): Observable<any> {
    const params = new HttpParams()
      .set('field', field)
      .set('pageNum', pageNum.toString())
      .set('sizePages', sizePages.toString())
      .set('sortDirec', sortDirec);
    return this.http.get<any>(`${this.baseURL}/all-paginated`, { params });
  }

  public getDetailsBySale(saleID: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${saleID}/details`);
  }
}

// Define las estructuras de los datos
export interface SaleRequest {
  serie: string;
  number: string;
  issueDate: string; // o Date si estás usando Date en tu modelo
  dueDate: string;   // o Date si estás usando Date en tu modelo
  typeVoucher: number;
  customer: string;
  opening: string;
  observation: string;
  status: number;
  total: number;
  typePayment: number;
  items: ItemSaleRequest[];
  payments: PaymentsRequest[];
}

export interface ItemSaleRequest {
  product: string;
  quantity: number;
  salePrice: number;
}

export interface PaymentsRequest {
  amount: number;
  paymentMethod: number;
  date: string; // o Date si estás usando Date en tu modelo
  paymentStatus: number;
}
