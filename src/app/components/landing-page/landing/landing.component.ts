import { CarouselComponent } from './../carousel/carousel.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Subscription, map } from 'rxjs';

import { ProductListComponent } from 'src/app/shared/components/product-list/product-list.component';
import { Product } from 'src/app/shared/model/product.model';
import * as fromApp from '../../../shared/store/app.reducer';
import * as ProductsActions from '../../../shared/store/product/action/product.actions';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ProductListComponent, CarouselComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnDestroy, OnInit {
  productsSubscription: Subscription;
  products: Product[] = [];

  constructor(private store: Store<fromApp.AppState>, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('فروشگاه سبد');
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
