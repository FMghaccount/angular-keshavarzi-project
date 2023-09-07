import { Category } from 'src/app/shared/model/category.model';
import * as CategoriesActions from '../action/category.actions';

export interface State {
  categories: Category[];
  error: string;
}

const initialState: State = {
  categories: [],
  error: null,
};

export function categoryReducer(
  state = initialState,
  action: CategoriesActions.CategoriesActions
) {
  switch (action.type) {
    case CategoriesActions.SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
        error: null,
      };
    case CategoriesActions.LOADFAILURE_CATEGORIES:
      return {
        ...state,
        categories: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
