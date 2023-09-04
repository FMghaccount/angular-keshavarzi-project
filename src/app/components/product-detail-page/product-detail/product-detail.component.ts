import { Subscription, map, switchMap } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/shared/model/product.model';
import * as fromApp from '../../../shared/store/app.reducer';
import { CartItems } from 'src/app/shared/model/cart.model';
import * as CartActions from '../../../shared/store/cart/action/cart.actions';
import { Meta, Title } from '@angular/platform-browser';
import { ProductListComponent } from 'src/app/shared/components/product-list/product-list.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    NgbCarouselModule,
    RouterModule,
    ProductListComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [NgbCarouselConfig],
})
export class ProductDetailComponent {
  productSubscription: Subscription;
  relatedProducts: Product[];
  productId: number;
  product: Product;
  productSpecs: [];

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute,
    private config: NgbCarouselConfig,
    private title: Title,
    private meta: Meta,
    private toastr: ToastrService
  ) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit() {
    this.productSubscription = this.activatedRoute.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.productId = id;
          return this.store.select('products');
        }),
        map((productsState) => {
          this.relatedProducts = productsState.products;
          return productsState.products.at(this.productId);
        })
      )
      .subscribe((product) => {
        this.product = product;
        this.title.setTitle(product.pageTitle);
        if (this.meta.getTag(`name=description`)) {
          this.meta.updateTag(
            { name: 'description', content: `${product.pageTitle}` },
            `name='description'`
          );
        } else {
          this.meta.addTag({
            name: 'description',
            content: `${product.pageTitle}`,
          });
        }
        if (this.meta.getTag(`name=keywords`)) {
          this.meta.updateTag(
            { name: 'keywords', content: `${product.pageTitle}` },
            `name='keywords'`
          );
        } else {
          this.meta.addTag({
            name: 'keywords',
            content: `${product.pageTitle}`,
          });
        }
        this.relatedProducts = this.relatedProducts.filter((item) => {
          return (
            item.categoryId === product.categoryId &&
            item.brandId === product.brandId
          );
        });
        // let productSpecs = product.specs.split('-');
      });
  }

  addToBasket(product: Product) {
    let cartItem: CartItems = {
      item: product,
      price: +product.price,
      title: product.pageTitle,
      amount: 1,
    };
    this.toastr.success(
      'محصول مورد نظر شما با موفقیت به سبد خرید اضافه شد',
      'اضافه شد!',
      {
        timeOut: 4000,
        closeButton: true,
        newestOnTop: true,
        progressBar: true,
      }
    );
    this.store.dispatch(new CartActions.AddToCart(cartItem));
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
