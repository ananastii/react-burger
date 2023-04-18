import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../../utils/store';
import { TIngredientsActions } from '../actions/ingredients';
import { TConstructorActions } from '../actions/burger-constructor';
import { TOrderActions } from '../actions/order';
import { TAuthActions } from '../actions/auth';
import { TWsActions } from '../actions/ws';
import { TWsUserActions } from '../actions/wsUser';

export type RootState = ReturnType<typeof store.getState>;

type TAppActions =
  | TIngredientsActions
  | TConstructorActions
  | TOrderActions
  | TAuthActions
  | TWsActions
  | TWsUserActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TAppActions>;

export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;
