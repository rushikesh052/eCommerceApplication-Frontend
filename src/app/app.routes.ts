import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSucessComponent } from './payment-sucess/payment-sucess.component';
import { LoginComponent } from './login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

export const routes: Routes = [

    {path: 'category/:id', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'search/:keyword', component: ProductListComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'cart-details', component: CartDetailsComponent},
    {path: 'checkout',component: CheckoutComponent},
    {path: 'payment-sucess',component: PaymentSucessComponent},
    {path: 'login',component: LoginComponent},
    {path: 'orders',component: OrderHistoryComponent},
    {path: '', redirectTo:'/products',pathMatch: 'full'},
    {path:'**',redirectTo:'products',pathMatch:'full'}
];
