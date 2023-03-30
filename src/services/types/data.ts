export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TIngredientInfo = {
  readonly _id: string;
  readonly name: string;
  readonly type: TIngredientType;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
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
  readonly ingredients: string[],
  readonly _id: string,
  readonly name: string,
  readonly status: string,
  readonly number: number,
  readonly createdAt: string,
}

export type TFormValues = {
  email?: string,
  name?: string,
  password?: string,
  token?: string
}

export type TLoginFormState = {
  email: string,
  password: string,
}

export type TUserFormState = {
  name: string,
  email: string,
  password: string,
}

export type TForgotFormState = {
  email: string,
}

export type TResetFormState = {
  password: string,
  token: string,
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
