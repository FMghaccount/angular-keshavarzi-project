import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from 'src/app/shared/model/product.model';
import { Category } from './shared/model/category.model';
import * as fromApp from './shared/store/app.reducer';
import * as ProductsActions from './shared/store/product/action/product.actions';
import * as CategoriesActions from './shared/store/category/action/category.actions';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './shared/components/menu/navigation/navigation.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterModule, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  products: Product[] = [];
  categories: Category[] = [];
  productsSubscription: Subscription;
  categoriesSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) // private route: Router
  {}

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
    this.categoriesSubscription = this.store
      .select('categories')
      .pipe(map((categoriesState) => categoriesState.categories))
      .subscribe((categories) => {
        this.categories = categories;
      });
    if (this.categories.length === 0) {
      this.store.dispatch(new CategoriesActions.FetchCategories());
    }
    // this.route.navigate(['/landing']);
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}
