import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { constructorReducer } from './burger-constructor';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientDetailsReducer,
  burgerConstructor: constructorReducer
});
