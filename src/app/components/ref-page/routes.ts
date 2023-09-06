import { Routes } from '@angular/router';
// import { categoryResolver } from 'src/app/shared/resolvers/category.resolver';

export const REF_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ref-page.component').then((module) => module.RefPageComponent),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./ref/ref.component').then((module) => module.RefComponent),
      },
    ],
  },
];
