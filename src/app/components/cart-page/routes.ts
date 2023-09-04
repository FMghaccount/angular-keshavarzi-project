import { Routes } from '@angular/router';
// import { categoryResolver } from 'src/app/shared/resolvers/category.resolver';

export const CART_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./cart-page.component').then(
        (module) => module.CartPageComponent
      ),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./cart/cart.component').then(
            (module) => module.CartComponent
          ),
      },
    ],
  },
];
