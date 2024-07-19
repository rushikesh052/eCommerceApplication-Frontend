import { HttpClient } from '@angular/common/http';
import { EmbeddedViewRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orderUrl='http://localhost:8080/api/orders'

  constructor(private httpCilent : HttpClient) { }


  getCustomerOrders(theEmailId: string):Observable<GetOrdersHistory>{
      const apiUrl=`${this.orderUrl}/search/findByCustomerEmail?email=${theEmailId}`;
      return this.httpCilent.get<GetOrdersHistory>(apiUrl);
  }
}
interface GetOrdersHistory{
  _embedded:{
    orders: OrderHistory[];
  }
}
