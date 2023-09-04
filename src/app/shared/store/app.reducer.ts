import { CartItems } from './../model/cart.model';
import { ActionReducerMap } from '@ngrx/store';

import * as fromProducts from '../store/product/reducer/product.reducer';
import * as fromCategories from '../store/category/reducer/category.reducer';
import * as fromCart from '../store/cart/reducer/cart.reducer';

export interface AppState {
  products: fromProducts.State;
  categories: fromCategories.State;
  cart: fromCart.State;
}

// export const appReducer: ActionReducerMap<AppState> = {
//   products: fromProducts.productReducer,
//   categories: fromCategories.categoryReducer,
//   cart: fromCart.cartReducer,
// };
