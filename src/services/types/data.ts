export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TIngredientInfo = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TIngredientData = {
  info: TIngredientInfo,
  qty: number,
}

export type TIngredientFilling = {
  info: TIngredientInfo,
  id: string,
}

export type TOrderData = {
  ingredients: string[],
  _id: string,
  name: string,
  status: string,
  number: number,
  createdAt: string,
}

export type TUser = {
  name: string;
  email: string;
}

export type TOrderCheckout = (string | undefined)[]

export type TWsMessage = {
  orders: TOrderData[];
  total: number | null;
  totalToday: number | null;
};
