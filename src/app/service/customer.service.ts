import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURLCustomers= "http://localhost:8080/customers";

  constructor(private http: HttpClient) { 
  }


  getAllUsers():Observable<any>{
    return this.http.get(`${this.baseURLCustomers}/all`);
  }


  guardarCliente(cliente:any):Observable<any>{
    return this.http.post(`${this.baseURLCustomers}/register`,cliente);
  }


  getClienteByDocument(documento:string):Observable<any>{
    return this.http.get(`${this.baseURLCustomers}/${documento}`,);
  }




}
