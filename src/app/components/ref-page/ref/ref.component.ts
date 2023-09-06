import { Subscription, map, switchMap } from 'rxjs';
import { OrderService } from './../../../shared/services/order.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/model/order.model';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { State } from 'src/app/shared/store/cart/reducer/cart.reducer';

@Component({
  selector: 'app-ref',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
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
    private activatedRoute: ActivatedRoute
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
        this.order = order;
        this.isLoading = false;
        if (localStorage.getItem('cart')) {
          this.storedCart = JSON.parse(localStorage.getItem('cart'));
          if (this.order.isPaid) {
            localStorage.removeItem('cart');
          }
        }
      });
    this.timeoutSub = setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }

  ngOnDestroy() {
    this.isLoading = false;
    if (this.timeoutSub) clearTimeout(this.timeoutSub);
    if (this.orderSubscription) this.orderSubscription.unsubscribe();
  }
}
