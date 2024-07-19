import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  private RAZORPAY_KEY="rzp_test_6velCtDaXRLUzt"
  
  constructor() { }


  processPayment(orderId:string,amount:number,sucessCallback:(response: any)=> void): void{
    
    const options: any={
      key: this.RAZORPAY_KEY,
      amount: amount,
      currency: 'INR',
      name:'RUSHI IT',
      descripition: 'e-Commerce Order',
      order_id: orderId,
      handler: sucessCallback,
      prefil:{
        name:'Rushi It',
        email:'',
        contact:''
      },
      notes:{
        address: 'customer address'
      },
      theme: {
        "color": "#3399cc"
      }
    };
    const rzp1=new Razorpay(options);
  rzp1.open();
  };


}


