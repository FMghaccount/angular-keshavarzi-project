// import { map, switchMap, Subscription, combineLatest } from 'rxjs';
import { map, switchMap, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State, Store } from '@ngrx/store';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Product } from 'src/app/shared/model/product.model';
import * as fromApp from '../../../shared/store/app.reducer';
import { ProductListComponent } from 'src/app/shared/components/product-list/product-list.component';

interface result {
  params: Params;
  query: Params;
  products: State<Product[]>;
}

@Component({
  selector: 'app-selected-category',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductListComponent],
  templateUrl: './selected-category.component.html',
  styleUrls: ['./selected-category.component.css'],
})
export class SelectedCategoryComponent {
  categoryId: number;
  brandId: number;
  products: Product[];
  categorySubscription: Subscription;
  combineResult: result = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categorySubscription = this.activatedRoute.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.categoryId = id;
          return this.store.select('products');
        }),
        map((productsState) => {
          return productsState.products.filter((product) => {
            return product.categoryId === this.categoryId;
          });
        })
      )
      .subscribe((products) => {
        this.products = products;
      });

    // this.activatedRoute.queryParams.subscribe((queryParam: Params) => {
    //   if (queryParam['brand'] !== undefined) {
    //     this.brandId = +queryParam['brand'];
    //     console.log(this.products);
    //     console.log(this.brandId);
    //     this.products = this.products.filter((product) => {
    //       product.brandId === this.brandId;
    //     });
    //     console.log(this.products);
    //   }
    // });

    // combineLatest([
    //   this.activatedRoute.params,
    //   this.activatedRoute.queryParams,
    //   // this.store.select('products'),
    // ])
    //   .pipe(
    //     map((results) => ({
    //       params: results[0],
    //       query: results[1],
    //       // products: results[2],
    //     }))
    //   )
    //   .subscribe((results) => {
    //     this.categoryId = results.params['id'];
    //     this.brandId = results.query['brand'];
    //     // this.products = <Product[]>(<unknown>results.products);
    //   });
    // this.store.select('products').subscribe((productsState) => {
    //   this.products = productsState.products;
    //   if (this.categoryId !== null) {
    //     this.products = this.products?.filter((product) => {
    //       return product.categoryId === this.categoryId;
    //     });
    //   }
    //   if (this.brandId !== undefined) {
    //     this.products = this.products.filter((product) => {
    //       product.brandId === this.brandId;
    //     });
    //   }
    // });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) this.categorySubscription.unsubscribe();
  }
}
