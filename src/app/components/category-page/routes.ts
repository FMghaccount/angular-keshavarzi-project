import { Routes } from '@angular/router';
// import { categoryResolver } from 'src/app/shared/resolvers/category.resolver';

export const CATEGORY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./category-page.component').then(
        (module) => module.CategoryPageComponent
      ),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./category/category.component').then(
            (module) => module.CategoryComponent
          ),
      },
      {
        path: ':id',
        // resolve: { id: categoryResolver },
        loadComponent: () =>
          import('./selected-category/selected-category.component').then(
            (module) => module.SelectedCategoryComponent
          ),
      },
      {
        path: ':id/brand/:brandId',
        // resolve: { id: categoryResolver },
        loadComponent: () =>
          import('./brand/brand.component').then(
            (module) => module.BrandComponent
          ),
      },
    ],
  },
];
