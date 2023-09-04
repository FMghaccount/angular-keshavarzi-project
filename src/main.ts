/// <reference types="@angular/localize" />

import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

// import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { productEffects } from './app/shared/store/product/effect/product.effects';
import { categoryEffects } from './app/shared/store/category/effect/category.effects';
// import * as fromApp from './app/shared/store/app.reducer';
import { productReducer } from './app/shared/store/product/reducer/product.reducer';
import { categoryReducer } from './app/shared/store/category/reducer/category.reducer';
import { cartReducer } from './app/shared/store/cart/reducer/cart.reducer';

import { provideToastr } from 'ngx-toastr';
import { cartEffects } from './app/shared/store/cart/effect/cart.effects';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideStore({
      products: productReducer,
      categories: categoryReducer,
      cart: cartReducer,
    }),
    provideEffects([productEffects, categoryEffects, cartEffects]),
    provideToastr(),
    provideAnimations(),
    provideRouter(routes),
  ],
}).catch((e) => console.error(e));
