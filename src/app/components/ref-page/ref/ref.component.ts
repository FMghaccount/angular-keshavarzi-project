import { Subscription, map, switchMap } from 'rxjs';
import { OrderService } from './../../../shared/services/order.service';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Order } from 'src/app/shared/model/order.model';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { State } from 'src/app/shared/store/cart/reducer/cart.reducer';
import * as fromApp from '../../../shared/store/app.reducer';
import * as CartActions from '../../../shared/store/cart/action/cart.actions';

@Component({
  selector: 'app-ref',
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterModule],
  templateUrl: './ref.component.html',
  styleUrls: ['./ref.component.css'],
})
export class RefComponent {
  order: Order;
  orderId: string;
  ok: string;
  orderSubscription: Subscription;
  localStorageCart;
  isLoading: boolean = false;
  timeoutSub;
  storedCart: State;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.orderSubscription = this.activatedRoute.queryParams
      .pipe(
        map((params) => {
          return [params['ok'], params['orderID']];
        }),
        switchMap((params) => {
          this.ok = params[0];
          this.orderId = params[1];
          return this.orderService.getOrders(this.orderId);
        }),
        map((order) => {
          return order;
        })
      )
      .subscribe((order) => {
        if (order !== null && this.ok === 'true') {
          this.order = order;
          if (localStorage.getItem('cart')) {
            this.storedCart = JSON.parse(localStorage.getItem('cart'));
            if (this.order?.isPaid) {
              localStorage.removeItem('cart');
              this.store.dispatch(new CartActions.ClearCart());
            }
          }
        } else {
          this.order = null;
        }
      });
    this.timeoutSub = setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  ngOnDestroy() {
    this.isLoading = false;
    if (this.timeoutSub) clearTimeout(this.timeoutSub);
    if (this.orderSubscription) this.orderSubscription.unsubscribe();
  }
}
