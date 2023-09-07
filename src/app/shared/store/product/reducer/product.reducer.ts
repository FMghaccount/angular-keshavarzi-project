// import { createReducer, on } from '@ngrx/store';

// import { setProducts } from './../action/product.actions';
import { Product } from 'src/app/shared/model/product.model';
import * as ProductsActions from '../action/product.actions';

export interface State {
  products: Product[];
  error: string;
  isLoading: boolean;
}

const initialState: State = {
  products: [],
  error: null,
  isLoading: false,
};

// export const productReducer = createReducer(
//   initialState,
//   on(setProducts, (state, action) => {
//     return {
//       ...state,
//       products: [...action.value],
//     };
//   })
// );

export function productReducer(
  state = initialState,
  action: ProductsActions.ProductsActions
) {
  switch (action.type) {
    case ProductsActions.SET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
        error: null,
        isLoading: false,
      };
    case ProductsActions.LOADFAILURE_PRODUCTS:
      return {
        ...state,
        products: [],
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
