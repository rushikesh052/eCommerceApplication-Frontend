import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";
import { CommonModule } from '@angular/common';
import { ProductCategoryMenuComponent } from "./product-category-menu/product-category-menu.component";
import { SearchComponent } from "./search/search.component";
import { CartStatusComponent } from "./cart-status/cart-status.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, ProductListComponent, CommonModule, ProductCategoryMenuComponent, SearchComponent, CartStatusComponent]
})
export class AppComponent {
  title = 'ecomm-frontend';
products: any;
}
