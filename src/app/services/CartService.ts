import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  constructor() { }

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  addToCart(theCartItem: CartItem){


    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = new CartItem(0, "", "", 0);

    if(this.cartItems.length > 0){
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
          existingCartItem = tempCartItem;
          alreadyExistsInCart = true;
          break;
        }
      }
    }

    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }   
    this.computeCartTotals();
  }

  computeCartTotals(){
     let totalPriceValue: number = 0;
     let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){

      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;

    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  decrementQuantity(theCartItem: CartItem){
    theCartItem.quantity--;

    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem){
    const itemIndex = this.cartItems.findIndex(tempCartItem => theCartItem.id === theCartItem.id);
    if(itemIndex > -1){
       this.cartItems.splice(itemIndex, 1);
       this.computeCartTotals();
    }
  }


}