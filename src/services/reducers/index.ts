import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { wsReducer } from './ws';
import { wsUserReducer } from './wsUser';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  auth: authReducer,
  wsAll: wsReducer,
  wsUser: wsUserReducer
});
