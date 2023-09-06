import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs';
import * as fromApp from '../../app.reducer';
import * as ProductsActions from '../action/product.actions';
import { Product } from 'src/app/shared/model/product.model';

@Injectable()
export class productEffects {
  loadProducts = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.FETCH_PRODUCTS),
      switchMap(() => {
        return this.http.get<Product[]>(
          process.env.NG_APP_FIREBASEAPIURL + '/products.json'
        );
      }),
      map((products) => {
        return new ProductsActions.SetProducts(products);
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}
}
