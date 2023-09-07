import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, catchError, of } from 'rxjs';
import * as fromApp from '../../app.reducer';
import * as CategoriesActions from '../action/category.actions';
import { Category } from 'src/app/shared/model/category.model';

const handleError = (errorRes: HttpErrorResponse) => {
  let errorMessage =
    'خطا رخ داده است. لطفاً بعد از مدتی دوباره امتحان کنید و از روشن بودن VPN اطمینان حاصل فرمایید';
  return of(new CategoriesActions.LoadFailureCategories(errorMessage));
};

@Injectable()
export class categoryEffects {
  loadProducts = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.FETCH_CATEGORIES),
      switchMap(() => {
        return this.http.get<Category[]>(
          process.env.NG_APP_FIREBASEAPIURL + '/category.json'
        );
      }),
      map((categories) => {
        return new CategoriesActions.SetCategories(categories);
      }),
      catchError((errorRes: HttpErrorResponse) => {
        return handleError(errorRes);
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}
}
