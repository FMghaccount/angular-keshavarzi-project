import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// import { switchMap, tap } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs';
import * as fromApp from '../../app.reducer';
import * as CartActions from '../action/cart.actions';
import { State } from '../reducer/cart.reducer';
// import { State } from '../reducer/cart.reducer';

@Injectable()
export class cartEffects {
  loadCart = createEffect(
    () => {
      // return this.actions$.pipe(
      //   ofType(CartActions.INIT_CART),
      //   switchMap(() => {
      //     const storedCart: State = JSON.parse(localStorage.getItem('cart'));
      //     if (storedCart) {
      //       return new CartActions.SetCart(storedCart);
      //     }
      //     return new CartActions.SetCart(null);
      //   })
      // );
      return this.actions$.pipe(
        ofType(CartActions.INIT_CART),
        tap(() => {
          if (localStorage.getItem('cart')) {
            console.log(JSON.parse(localStorage.getItem('cart')));
            return new CartActions.SetCart(
              JSON.parse(localStorage.getItem('cart'))
            );
          }
          return new CartActions.SetCart(null);
        })
      );
    },
    { dispatch: false }
  );

  // setLocalStorage = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(CartActions.ADDTO_CART),
  //       tap((cart: State) => {
  //         // console.log('create cart');
  //         let cartStorage = JSON.parse(localStorage.getItem('cart'));
  //         if (localStorage.getItem('cart')) {
  //         } else {
  //           console.log(cart);
  //           // localStorage.setItem('cart', cart.toString());
  //           // console.log('update cart');
  //           // cartStorage
  //         }
  //       })
  //     ),
  //   { dispatch: false }
  // );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}
}
