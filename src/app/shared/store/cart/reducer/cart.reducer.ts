import { CartItems } from 'src/app/shared/model/cart.model';
import * as CartActions from '../action/cart.actions';

export interface State {
  id: string;
  price: number;
  items: CartItems[];
  amount: number;
  isPaid: boolean;
  expirationDate: Date;
}

let startDate = new Date();
let day = 60 * 60 * 24 * 1000;
let endDate = new Date(startDate.getTime() + day);

const initialState: State = {
  id: crypto.randomUUID(),
  price: 0,
  items: [],
  amount: 0,
  isPaid: false,
  expirationDate: endDate,
};

export function cartReducer(
  state = initialState,
  action: CartActions.CartActions
) {
  switch (action.type) {
    case CartActions.SET_CART:
      return {
        ...state,
        items: action.payload.items,
        id: action.payload.id,
        price: action.payload.price,
        amount: action.payload.amount,
        isPaid: action.payload.isPaid,
        expirationDate: action.payload.expirationDate,
      };
    case CartActions.CLEAR_CART:
      return initialState;

    case CartActions.ADDTO_CART:
      let cartItems = [...state.items];
      let foundItem = cartItems.findIndex(
        (item) => item.title === action.payload.title
      );
      if (foundItem > -1) {
        localStorage.removeItem('cart');
        let foundCartItem = JSON.parse(JSON.stringify(cartItems[foundItem]));
        foundCartItem.amount = action.payload.amount + foundCartItem.amount;
        cartItems[foundItem] = foundCartItem;
        const result = {
          ...state,
          amount: state.amount + 1,
          items: cartItems,
          price: state.price + action.payload.price,
        };
        localStorage.setItem('cart', JSON.stringify(result));
        return {
          ...state,
          amount: state.amount + 1,
          items: cartItems,
          price: state.price + action.payload.price,
        };
      } else {
        let cartItem = {
          item: action.payload.item,
          amount: 1,
          title: action.payload.title,
          price: action.payload.price,
        };
        const result = {
          ...state,
          amount: state.amount + 1,
          items: [...state.items, cartItem],
          price: state.price + cartItem.price,
        };
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(result));
        return {
          ...state,
          amount: state.amount + 1,
          items: [...state.items, cartItem],
          price: state.price + cartItem.price,
        };
      }
    case CartActions.REMOVEFROM_CART:
      let r_cartItems = [...state.items];
      let r_foundItem = r_cartItems.findIndex(
        (item) => item.title === action.payload.title
      );
      if (r_cartItems[r_foundItem].amount === 1) {
        let r_resultCartItem = JSON.parse(JSON.stringify(r_cartItems));
        r_resultCartItem = r_resultCartItem.filter((item) => {
          return item.title !== action.payload.title;
        });
        const r_result = {
          ...state,
          amount: state.amount - 1,
          items: r_resultCartItem,
          price: state.price - r_cartItems[r_foundItem].price,
        };
        if (state.amount === 1) {
          localStorage.removeItem('cart');
        } else {
          localStorage.removeItem('cart');
          localStorage.setItem('cart', JSON.stringify(r_result));
        }
        return {
          ...state,
          amount: state.amount - 1,
          items: r_resultCartItem,
          price: state.price - r_cartItems[r_foundItem].price,
        };
      } else {
        let rr_resultCartItem = JSON.parse(
          JSON.stringify(r_cartItems[r_foundItem])
        );
        rr_resultCartItem.amount =
          rr_resultCartItem.amount - action.payload.amount;
        r_cartItems[r_foundItem] = rr_resultCartItem;
        const r_result = {
          ...state,
          amount: state.amount - 1,
          items: r_cartItems,
          price: state.price - r_cartItems[r_foundItem].price,
        };
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(r_result));
        return {
          ...state,
          amount: state.amount - 1,
          items: r_cartItems,
          price: state.price - r_cartItems[r_foundItem].price,
        };
      }
    case CartActions.REMOVEWHOLEITEMFROM_CART:
      let rwf_cartItems = [...state.items];
      let rwf_foundItem = rwf_cartItems.findIndex(
        (item) => item.title === action.payload.title
      );
      let rwf_resultCartItem = JSON.parse(JSON.stringify(rwf_cartItems));
      rwf_resultCartItem = rwf_resultCartItem.filter((item) => {
        return item.title !== action.payload.title;
      });
      const r_result = {
        ...state,
        amount: state.amount - 1,
        items: rwf_resultCartItem,
        price: state.price - rwf_cartItems[rwf_foundItem].price,
      };
      if (state.amount === 1) {
        localStorage.removeItem('cart');
      } else {
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(r_result));
      }
      return {
        ...state,
        amount: state.amount - 1,
        items: rwf_resultCartItem,
        price: state.price - rwf_cartItems[rwf_foundItem].price,
      };

    default:
      return state;
  }
}
