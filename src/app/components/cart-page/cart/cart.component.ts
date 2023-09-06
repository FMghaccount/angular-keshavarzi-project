import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../shared/store/app.reducer';
import * as CartReducer from '../../../shared/store/cart/reducer/cart.reducer';
import * as CartActions from '../../../shared/store/cart/action/cart.actions';
import { CartItems } from 'src/app/shared/model/cart.model';
import { Product } from 'src/app/shared/model/product.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  cart: CartReducer.State;
  cartItems: CartItems[] = [];
  storedCartId: string;

  constructor(
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cartSubscription = this.store.select('cart').subscribe((cart) => {
      this.cart = cart;
      this.cartItems = cart.items;
    });
  }

  increaseCartItemAmount(product: Product) {
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

  decreaseCartItemAmount(product: Product) {
    let cartItem: CartItems = {
      item: product,
      price: +product.price,
      title: product.pageTitle,
      amount: 1,
    };
    this.toastr.success(
      'محصول مورد نظر شما با موفقیت از سبد خرید کم شد',
      'کم شد!',
      {
        timeOut: 4000,
        closeButton: true,
        newestOnTop: true,
        progressBar: true,
      }
    );
    this.store.dispatch(new CartActions.RemoveFromCart(cartItem));
  }
  removeItemFromBasket(product: Product) {
    let cartItem: CartItems = {
      item: product,
      price: +product.price,
      title: product.pageTitle,
      amount: 1,
    };
    this.toastr.success(
      'محصول مورد نظر شما با موفقیت از سبد خرید کم شد',
      'کم شد!',
      {
        timeOut: 4000,
        closeButton: true,
        newestOnTop: true,
        progressBar: true,
      }
    );
    this.store.dispatch(new CartActions.RemoveWholeItemFromCart(cartItem));
  }

  sendPaymentReq() {
    let startDate = new Date();
    let minute = 60 * 10 * 1000;
    let endDate = new Date(startDate.getTime() + minute);
    const order = {
      id: crypto.randomUUID(),
      cart: this.cart,
      expirationTime: endDate,
      refId: '',
    };
    this.http
      .post(process.env.NG_APP_FIREBASEAPIURL + 'orders.json', order, {
        observe: 'response',
      })
      .subscribe((response) => {
        this.storedCartId = response.body['name'];
        window.location.href = `http://localhost:56743/landing/${this.storedCartId}`;
      });
  }

  pay() {
    this.sendPaymentReq();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}
