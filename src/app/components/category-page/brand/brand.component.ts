import { switchMap, map, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Product } from 'src/app/shared/model/product.model';
import * as fromApp from '../../../shared/store/app.reducer';
import { ProductListComponent } from 'src/app/shared/components/product-list/product-list.component';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterModule],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent {
  categoryId: number;
  brandId: number;
  products: Product[];
  productSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productSubscription = this.activatedRoute.params
      .pipe(
        map((params) => {
          return [+params['id'], +params['brandId']];
        }),
        switchMap((params) => {
          this.categoryId = params[0];
          this.brandId = params[1];
          return this.store.select('products');
        }),
        map((productsState) => {
          return productsState.products.filter((product) => {
            return (
              product.categoryId === this.categoryId &&
              product.brandId === this.brandId
            );
          });
        })
      )
      .subscribe((products) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
