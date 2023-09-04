// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/landing-page/routes').then(
        (module) => module.LANDINGPAGE_ROUTES
      ),
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (module) => module.AboutComponent
      ),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./components/category-page/routes').then(
        (module) => module.CATEGORY_ROUTES
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./components/product-detail-page/routes').then(
        (module) => module.PRODUCTDETAIL_ROUTES
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./components/cart-page/routes').then(
        (module) => module.CART_ROUTES
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import(
        './shared/components/not-found-page/not-found-page.component'
      ).then((module) => module.NotFoundPageComponent),
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
