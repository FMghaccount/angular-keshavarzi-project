import { Subscription, map } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { ProductListComponent } from 'src/app/shared/components/product-list/product-list.component';
import * as fromApp from '../../../shared/store/app.reducer';
import { RouterModule } from '@angular/router';
import { Product } from 'src/app/shared/model/product.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  products: Product[];
  productsSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {} // private activatedRoute: ActivatedRoute, // private router: Router

  ngOnInit() {
    this.productsSubscription = this.store
      .select('products')
      .pipe(map((productsState) => productsState.products))
      .subscribe((products) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}
