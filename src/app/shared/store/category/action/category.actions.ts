import { Action } from '@ngrx/store';

import { Category } from 'src/app/shared/model/category.model';

export const SET_CATEGORIES = '[Categories] SET_CATEGORIES';
export const FETCH_CATEGORIES = '[Categories] FETCH_CATEGORIES';
export const LOADFAILURE_CATEGORIES = '[Categories] LOADFAILURE_CATEGORIES';

export class SetCategories implements Action {
  readonly type = SET_CATEGORIES;

  constructor(public payload: Category[]) {}
}

export class LoadFailureCategories implements Action {
  readonly type = LOADFAILURE_CATEGORIES;

  constructor(public payload: string) {}
}

export class FetchCategories implements Action {
  readonly type = FETCH_CATEGORIES;
}

export type CategoriesActions =
  | SetCategories
  | FetchCategories
  | LoadFailureCategories;
