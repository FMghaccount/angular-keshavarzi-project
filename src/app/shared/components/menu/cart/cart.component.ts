import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { State } from 'src/app/shared/store/cart/reducer/cart.reducer';
import * as CartActions from '../../../store/cart/action/cart.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  cartAmount: number = 0;
  storedCart: State;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    if (localStorage.getItem('cart')) {
      this.storedCart = JSON.parse(localStorage.getItem('cart'));
      let date = new Date();
      // console.log(this.storedCart.expirationDate.getTime());
      let expirationDate = new Date(this.storedCart.expirationDate);
      if (date.getTime() < expirationDate.getTime()) {
        this.cartAmount = this.storedCart.amount;
        this.store.dispatch(new CartActions.SetCart(this.storedCart));
      } else {
        localStorage.removeItem('cart');
      }
    }
    this.cartSubscription = this.store.select('cart').subscribe((cartItem) => {
      this.cartAmount = cartItem.amount;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}
