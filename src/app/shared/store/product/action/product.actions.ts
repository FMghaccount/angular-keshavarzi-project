// import { createAction, props } from '@ngrx/store';
// import { Product } from 'src/app/shared/model/product.model';

// export const initProducts = createAction('[Product] Init');

// export const setProducts = createAction(
//   '[Product] SetProducts',
//   props<{ value: Product[] }>()
// );

import { Action } from '@ngrx/store';

import { Product } from 'src/app/shared/model/product.model';

export const SET_PRODUCTS = '[Products] SET_PRODUCTS';
export const FETCH_PRODUCTS = '[Products] FETCH_PRODUCTS';

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: Product[]) {}
}

export class FetchProducts implements Action {
  readonly type = FETCH_PRODUCTS;
}

export type ProductsActions = SetProducts | FetchProducts;
