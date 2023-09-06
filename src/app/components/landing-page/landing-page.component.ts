import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Subscription, map } from 'rxjs';

import { Product } from 'src/app/shared/model/product.model';
import * as fromApp from '../../shared/store/app.reducer';
import * as ProductsActions from '../../shared/store/product/action/product.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnDestroy, OnInit {
  productsSubscription: Subscription;
  products: Product[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.productsSubscription = this.store
      .select('products')
      .pipe(map((productsState) => productsState.products))
      .subscribe((products) => {
        this.products = products;
      });
    if (this.products.length === 0) {
      this.store.dispatch(new ProductsActions.FetchProducts());
    }
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}
