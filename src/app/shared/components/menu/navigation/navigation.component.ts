import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { Category } from 'src/app/shared/model/category.model';
import { CartComponent } from '../cart/cart.component';
import * as fromApp from '../../../store/app.reducer';
import { ToastrService } from 'ngx-toastr';

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
  error: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('categories')
      .subscribe((categoriesState) => {
        this.categories = categoriesState.categories;
        this.error = categoriesState.error;
        if (this.error) {
          this.toastr.error(this.error, 'خطا رخ داد!', {
            timeOut: 4000,
            closeButton: true,
            newestOnTop: true,
            progressBar: true,
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
