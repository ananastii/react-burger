import { v4 as uuid } from 'uuid';

import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT
} from '../actions/burger-constructor';

const initialState = {
  fillings: [],
  bun: null
};

export const constructorReducer = (state = initialState, action) => {
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
        constructor: [...state.constructor].filter(item => item.id !== action.data.id)
      }
    }
    default: {
      return state;
    }
  }
};
