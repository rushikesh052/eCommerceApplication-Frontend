import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl="http://localhost:8080/api/products"
  private categoryBaseUrl="http://localhost:8080/api/product-category"
  constructor(private httpClient:HttpClient) { }


  getProduct(theProductId: number): Observable<Product>{
    const productUrl=`${this.baseUrl}/${theProductId}`
    return this.httpClient.get<Product>(productUrl);
  }

  getProducts(): Observable<Product[]>{
    return this.httpClient
               .get<getResponse>(this.baseUrl)
               .pipe(map(response => response._embedded.products))
  }

  searchProducts(theKeyword: string):Observable<Product[]>{
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.httpClient   
              .get< getResponse>(searchUrl)
              .pipe(map(response => response._embedded.products));
  }

  getProductsByCategory(theCategoryId:number): Observable<Product[]>{
    const searchUrl=`${this.categoryBaseUrl}/${theCategoryId}/products`;
    return this.httpClient
               .get<getResponse>(searchUrl)
               .pipe(map(response => response._embedded.products));
  }
  getProductCategories():Observable<ProductCategory[]>{
    return this.httpClient   
              .get< GetProductCategories>(this.categoryBaseUrl)
              .pipe(map(response => response._embedded.productCategory));
  }
}

interface getResponse{
  _embedded:{
    products: Product[];
  }
}

interface GetProductCategories{
  _embedded:{
    productCategory: ProductCategory[];
  }
}
