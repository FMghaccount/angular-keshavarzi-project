import { Subscription, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import domToImage from 'dom-to-image';
// import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Order } from 'src/app/shared/model/order.model';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { OrderService } from './../../../shared/services/order.service';
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
  @ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef;
  order: Order = null;
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
    }, 1000);
  }

  downloadAsPDF() {
    const width = this.dataToExport.nativeElement.clientWidth;
    const height = this.dataToExport.nativeElement.clientHeight + 40;
    let orientation: 'p' | 'portrait' | 'l' | 'landscape' = 'p';
    let imageUnit: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc' = 'pt';
    if (width > height) {
      orientation = 'l';
    } else {
      orientation = 'p';
    }

    domToImage
      .toPng(this.dataToExport.nativeElement, {
        width: width,
        height: height,
      })
      .then((result) => {
        const pdf = new jsPDF(orientation, imageUnit, [
          width + 50,
          height + 220,
        ]);
        pdf.setFontSize(48);
        pdf.setTextColor('#2585fe');
        // pdf.text('رسید خرید', 25, 75);

        pdf.setFontSize(24);
        pdf.setTextColor('#131523');
        // pdf.text('Report date: ' + date.toLocaleString('fa-IR'), 25, 115);
        pdf.addImage(result, 'PNG', 25, 185, width, height);
        pdf.save('رسید خرید شما' + '.pdf');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getInvoiceDate() {
    const date = new Date();
    return date.toLocaleString('fa-IR');
  }

  ngOnDestroy() {
    this.isLoading = false;
    if (this.timeoutSub) clearTimeout(this.timeoutSub);
    if (this.orderSubscription) this.orderSubscription.unsubscribe();
  }
}
