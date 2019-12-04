import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Details, Product} from "../models/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  addProduct(product: Product): Observable<number> {
    return this.http.post<number>('/product', product);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/products');
  }

  getDetailsOfProduct(product_id: number): Observable<Details[]> {
    return this.http.get<Details[]>(`/details/${product_id}`);
  }

  updateProduct(product: Product): Observable<number> {
    return this.http.put<number>(`/product/${product.id}`, product);
  }

  deleteProduct(product_id: number): Observable<number> {
    return this.http.delete<number>(`/product/${product_id}`);
  }

  getProductNames(name: string): Observable<string[]> {
    return this.http.get<string[]>(`/products/byName/${name}`)
  }
}
