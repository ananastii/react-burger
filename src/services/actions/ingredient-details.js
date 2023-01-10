export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

export const openIngredientDetails = (ingredient) => ({
  type: OPEN_INGREDIENT_DETAILS,
  data: ingredient,
});

export const closeIngredientDetails = () => ({
  type: CLOSE_INGREDIENT_DETAILS,
});
