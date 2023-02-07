import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientDetailsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  auth: authReducer,
});
