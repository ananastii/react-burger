import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_INGREDIENTS,
  MOVE_INGREDIENT
} from '../constants/burger-constructor';
import { TConstructorActions } from '../actions/burger-constructor';
import { TConstructorState } from '../types/state';

const initialState: TConstructorState = {
  fillings: [],
  bun: null
};

export const constructorReducer = (state = initialState, action: TConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return action.data.info.type !== 'bun' ?
       {
        ...state,
        fillings: [
          ...state.fillings,
          { info: action.data.info, id: action.data.id },
        ],
      } :
      {
        ...state,
        bun:
          { info: action.data.info, id: action.data.id },
      }

    case DELETE_INGREDIENT: {
      return {
        ...state,
        fillings: [...state.fillings].filter(item => item.id !== action.id)
      }
    }
    case RESET_INGREDIENTS: {
      return {
        ...state,
        fillings: [],
        bun: null
      }
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        fillings: action.array
      }
    }
    default: {
      return state;
    }
  }
};
