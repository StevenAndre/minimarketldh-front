import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http:HttpClient) { }
  private baseURLSuppliers= "http://localhost:8080/suppliers";

  public getAllProeedores():Observable<Proveedor []>{
    return this.http.get<Proveedor []>(`${this.baseURLSuppliers}/all`);
  }

  public getAllProveedores(numPag: number = 0, field: string = 'name', pageSize: number = 3, sortDirec: string = 'asc'): Observable<Proveedor[]> {
    const params = new HttpParams()
      .set('numPag', numPag.toString())
      .set('field', field)
      .set('pageSize', pageSize.toString())
      .set('sortDirec', sortDirec);

    return this.http.get<Proveedor[]>(`${this.baseURLSuppliers}/all-pag`, { params });
  }

  public registrarProveedor(proveedor:ProveedorReg):Observable<any>{
    return this.http.post(`${this.baseURLSuppliers}/register`,proveedor);
  }

  public updateProveedor(document: string, supplierUpdate: any): Observable<any> {
    return this.http.put(`${this.baseURLSuppliers}/update/${document}`, supplierUpdate);
  }

  public getProveedorByDocument(document: string): Observable<any> {
    return this.http.get(`${this.baseURLSuppliers}/${document}`);
  }

  public deleteProveedor(document: string): Observable<any> {
    return this.http.delete(`${this.baseURLSuppliers}/delete/${document}`);
  }

  



}
class Proveedor{
  document: string="";
  name: string="";
  type_document: string="";
  address: string="";
  phone: string="";
  email: string="";
  observation: string="";
  category_supplier: any;
}

interface ProveedorReg {
  document: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  observation: string;
  type_document: number;
  category_supplier: number;
}


