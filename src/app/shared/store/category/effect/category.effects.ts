import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs';
import * as fromApp from '../../app.reducer';
import * as CategoriesActions from '../action/category.actions';
import { environment } from 'src/environments/environment.development';
import { Category } from 'src/app/shared/model/category.model';

@Injectable()
export class categoryEffects {
  loadProducts = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.FETCH_CATEGORIES),
      switchMap(() => {
        return this.http.get<Category[]>(
          environment.firebaseApiUrl + '/category.json'
        );
      }),
      map((categories) => {
        return new CategoriesActions.SetCategories(categories);
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}
}
