import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/shared/model/product.model';
import { CartItems } from 'src/app/shared/model/cart.model';
import * as fromApp from '../../../store/app.reducer';
import * as CartActions from '../../../store/cart/action/cart.actions';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input('product') product;
  @Input('productId') productId: number;

  constructor(
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) {}

  addToBasket(product: Product) {
    let cartItem: CartItems = {
      item: product,
      price: +product.price,
      title: product.pageTitle,
      amount: 1,
    };
    this.toastr.success(
      'محصول مورد نظر شما با موفقیت به سبد خرید اضافه شد',
      'اضافه شد!',
      {
        timeOut: 4000,
        closeButton: true,
        newestOnTop: true,
        progressBar: true,
      }
    );
    this.store.dispatch(new CartActions.AddToCart(cartItem));
  }
}
