import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private baseURL: string = 'http://localhost:8080/products';

  constructor(private http: HttpClient  ) {}

  // Método para registrar un nuevo producto
  public registerProduct(productRequest: ProductRequest, image: File | null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('product', new Blob([JSON.stringify(productRequest)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image, image.name);
    }

    return this.http.post<any>(`${this.baseURL}/register`, formData);
  }

  // Método para obtener todos los productos
  public getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/all`);
  }

  // Método para eliminar un producto por ID
  public deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/delete/${productId}`);
  }

  // Método para obtener un producto por ID
  public getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${productId}`);
  }

  // Método para obtener todos los productos con paginación y ordenamiento
  public getAllProductsPaginated(
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

  // Método para actualizar un producto por ID
  public updateProduct(productId: string, productUpdate: ProductUpdate, image: File | null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('product', new Blob([JSON.stringify(productUpdate)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image, image.name);
    }

    return this.http.put<any>(`${this.baseURL}/update/${productId}`, formData);
  }

  // Método para obtener la imagen de un producto
  public getProductImage(filename: string): Observable<Blob> {
    const headers = new HttpHeaders().append('Accept', 'image/*');
    return this.http.get<Blob>(`${this.baseURL}/image/${filename}`, { 
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }
}
export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  category: number;
  brand: number;
  unit: number;
}

// product-update.model.ts
export interface ProductUpdate {
  name: string;
  description: string;
  price: number;
}
