import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { OrderHistory } from '../common/order-history';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit{

  orderHistoryList: OrderHistory[]= [];
storage: Storage =sessionStorage;

  constructor(private orderService: OrdersService){



  }

  ngOnInit(): void {
    this.loadCustomerOrders();
  }

  loadCustomerOrders(){
    const theEamilId =this.storage.getItem('customerEmail');
    this.orderService.getCustomerOrders(theEamilId!).subscribe( data => {
      this.orderHistoryList=data._embedded.orders;
      this.orderHistoryList= data._embedded.orders;
      console.log(this.orderHistoryList);
    });
  }



}
