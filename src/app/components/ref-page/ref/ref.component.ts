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
import { ToastrService } from 'ngx-toastr';

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
  date: string;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.date = new Date().toLocaleString('fa-IR');
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
          this.toastr.success('پرداخت با موفقیت انجام شد', 'انجام شد!', {
            timeOut: 4000,
            closeButton: true,
            newestOnTop: true,
            progressBar: true,
          });
        } else {
          this.order = null;
          this.toastr.error('پرداخت با خطا رو برو شد', 'انجام نشد!', {
            timeOut: 4000,
            closeButton: true,
            newestOnTop: true,
            progressBar: true,
          });
        }
      });
    this.timeoutSub = setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  downloadAsPDF() {
    console.log(this.dataToExport.nativeElement);
    console.log(this.dataToExport);
    window.scrollTo(0, 0);
    const width = this.dataToExport.nativeElement.clientWidth + 80;
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
        height: height + 30,
      })
      .then((result) => {
        const pdf = new jsPDF(orientation, imageUnit, [width, height]);
        pdf.addImage(result, 'PNG', 0, 0, width, height);
        pdf.save('رسید خرید شما' + '.pdf');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.isLoading = false;
    if (this.timeoutSub) clearTimeout(this.timeoutSub);
    if (this.orderSubscription) this.orderSubscription.unsubscribe();
  }
}
