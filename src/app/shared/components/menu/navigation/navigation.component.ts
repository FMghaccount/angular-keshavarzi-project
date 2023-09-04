import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { Category } from 'src/app/shared/model/category.model';
import { CartComponent } from '../cart/cart.component';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, CartComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('categories')
      .pipe(map((productsState) => productsState.categories))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
