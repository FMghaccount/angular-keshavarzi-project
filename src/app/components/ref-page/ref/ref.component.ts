import { Subscription, map, switchMap } from 'rxjs';
import { OrderService } from './../../../shared/services/order.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/model/order.model';

@Component({
  selector: 'app-ref',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ref.component.html',
  styleUrls: ['./ref.component.css'],
})
export class RefComponent {
  order: Order;
  orderId: string;
  ok: string;
  orderSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   this.orderId = params['orderId'];
    //   this.ok = params['ok'];
    // });

    // this.order = this.orderService.getOrders(this.orderId);
    // console.log(this.order);

    this.orderSubscription = this.activatedRoute.queryParams
      .pipe(
        map((params) => {
          return [params['ok'], params['orderId']];
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
        console.log(order);
        this.order = order;
      });
  }

  ngOnDestroy() {
    if (this.orderSubscription) this.orderSubscription.unsubscribe();
  }
}
