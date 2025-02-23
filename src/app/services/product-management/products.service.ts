import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { product } from '../../pages/admin-dashboard/models/product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<product[]> {
    return this.http.get<product[]>(`${environment.apiURL}/products`);
  }

  addProduct(product: product): Observable<product> {
    return this.http.post<product>(`${environment.apiURL}/products`, product);
  }

  updateProduct(product: product): Observable<product> {
    return this.http.put<product>(`${environment.apiURL}/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}/products/${id}`);
  }
}
