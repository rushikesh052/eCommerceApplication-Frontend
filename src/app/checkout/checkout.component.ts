import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../services/CartService';
import { CheckoutService } from '../services/checkout.service';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { Purchase } from '../common/purchase';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  orderId: string = "";


  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;


  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        name: [''],
        email: [''],
        phno: ['']
      }),
      shippingAddress: this.formBuilder.group({
        hno: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      })
    })
  }

  getName() { return this.checkoutFormGroup.get('customer.name') };
  getEmail() { return this.checkoutFormGroup.get('customer.email') };
  getPhno() { return this.checkoutFormGroup.get('customer.phno') };

  getStreet() { return this.checkoutFormGroup.get('shippingAddress.street') };
  getHno() { return this.checkoutFormGroup.get('shippingAddress.hno') };
  getCity() { return this.checkoutFormGroup.get('shippingAddress.city') };
  getState() { return this.checkoutFormGroup.get('shippingAddress.state') };
  getCountry() { return this.checkoutFormGroup.get('shippingAddress.country') };
  getzipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode') };


  onSubmit() {
    console.log("form submitted...");
    console.log("email ::" + this.checkoutFormGroup.get('customer')?.value.email);

    let order = new Order(this.totalQuantity, this.totalPrice);

    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(
      tempCartItem.imageUrl!, tempCartItem.unitPrice!, tempCartItem.quantity!, tempCartItem.id!))

    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe(data => {
      console.log(data);
      this.paymentService.processPayment(data.razorpayId, this.totalPrice, this.onPaymentSucess.bind(this));

    })
  }
  onPaymentSucess(response: any) {
    console.log('payment Sucess:', response);
    this.resetCart();
    this.orderId = response.razorpayId;
    console.log("order id ::" + this.orderId);

    this.router.navigateByUrl("/payment-sucess");
  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    })
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/product");
  }
}

