import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order: Order;
  constructor(private http: HttpClient) {}

  getOrders(orderId: string) {
    return this.http.get<Order>(
      process.env.NG_APP_FIREBASEAPIURL + `orders/${orderId}.json`
    );
    // .subscribe((response) => {
    //   this.order = response;
    // });

    // return this.order;
  }
}
