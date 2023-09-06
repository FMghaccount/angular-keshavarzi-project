import { Action } from '@ngrx/store';
import { CartItems } from 'src/app/shared/model/cart.model';
import { State } from '../reducer/cart.reducer';

export const INIT_CART = '[Cart] INIT_CART';
export const SET_CART = '[Cart] SET_CART';
export const FETCH_CART = '[Cart] FETCH_CART';
export const ADDTO_CART = '[Cart] ADDTO_CART';
export const REMOVEFROM_CART = '[Cart] REMOVEFROM_CART';
export const REMOVEWHOLEITEMFROM_CART = '[Cart] REMOVEWHOLEITEMFROM_CART';
export const CLEAR_CART = '[Cart] CLEAR_CART';

export class initCart implements Action {
  readonly type = INIT_CART;

  constructor() {}
}

export class SetCart implements Action {
  readonly type = SET_CART;

  constructor(public payload: State) {}
}

export class AddToCart implements Action {
  readonly type = ADDTO_CART;

  constructor(public payload: CartItems) {}
}

export class ClearCart implements Action {
  readonly type = CLEAR_CART;

  constructor() {}
}

export class RemoveFromCart implements Action {
  readonly type = REMOVEFROM_CART;

  constructor(public payload: CartItems) {}
}

export class RemoveWholeItemFromCart implements Action {
  readonly type = REMOVEWHOLEITEMFROM_CART;

  constructor(public payload: CartItems) {}
}

export class FetchCart implements Action {
  readonly type = FETCH_CART;
}

export type CartActions =
  | SetCart
  | FetchCart
  | AddToCart
  | initCart
  | RemoveFromCart
  | RemoveWholeItemFromCart
  | ClearCart;
