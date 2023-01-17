import { v4 as uuid } from 'uuid';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  data: {info: ingredient, id: uuid()}
});

export const deleteIngredient = (id) => ({
  type: DELETE_INGREDIENT,
  id: id,
});

export const resetOrderIngredients = () => ({
  type: RESET_INGREDIENTS,
});
