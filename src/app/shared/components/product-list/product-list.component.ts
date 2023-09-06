import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { RouterModule } from '@angular/router';

import * as fromApp from '../../store/app.reducer';
import { Product } from '../../model/product.model';
import { ProductComponent } from './product/product.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductComponent, LoadingComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Input('products') receivedProducts: Product[] = [];
  @Input('brandId') brandId: number;
  @Input('categoryId') categoryId: number;
  products: Product[] = [];
  productsSubscription: Subscription;
  isLoading: boolean = false;

  constructor(
    private store: Store<fromApp.AppState> // private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.receivedProducts?.length === 0) {
      this.productsSubscription = this.store
        .select('products')
        .pipe(
          map((productsState) => {
            this.isLoading = true;
            if (this.brandId && this.categoryId) {
              return productsState.products.filter((product) => {
                return (
                  product.categoryId === this.categoryId &&
                  product.brandId === this.brandId
                );
              });
            } else return productsState.products;
          })
        )
        .subscribe((products) => {
          this.products = products;
        });
    } else this.products = this.receivedProducts;
  }

  ngOnDestroy(): void {
    this.isLoading = false;
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}
