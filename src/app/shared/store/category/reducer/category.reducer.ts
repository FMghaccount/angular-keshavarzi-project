import { Category } from 'src/app/shared/model/category.model';
import * as CategoriesActions from '../action/category.actions';

export interface State {
  categories: Category[];
}

const initialState: State = {
  categories: [],
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
      };
    default:
      return state;
  }
}
