import { Routes } from '@angular/router';
// import { categoryResolver } from 'src/app/shared/resolvers/category.resolver';

export const PRODUCTDETAIL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-detail-page.component').then(
        (module) => module.ProductDetailPageComponent
      ),

    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./product-detail/product-detail.component').then(
            (module) => module.ProductDetailComponent
          ),
      },
    ],
  },
];
