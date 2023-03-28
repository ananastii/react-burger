import { TIngredientData, TIngredientFilling, TOrderData, TUser } from "./data";

export type TIngredientsState = {
  ingredients: Array<TIngredientData>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

export type TConstructorState = {
  fillings: Array<TIngredientFilling>;
  bun: TIngredientData | null;
}

export type TOrderState = {
  orderRequest: boolean,
  orderFailed: boolean,
  orderId: number | null,
  openModal: boolean
};

export type TAuthState = {
  user: TUser | null,
  password: string | null,
  authRequest: false,
  authFailed: false,
  pwdResetRequested: false,
  pwdSubmitSuccess: false,
};

export type TWsState = {
  wsConnected: boolean,
  orders: TOrderData[],
  total: number | null,
  totalToday: number| null,
};

export type TStoreIngredients = {
  ingredients: TIngredientsState
}

export type TStoreConstructor = {
  burgerConstructor: TConstructorState
}

export type TStoreOrder = {
  order: TOrderState
}

export type TStoreAuth = {
  auth: TAuthState
}

export type TStoreWs = {
  wsAll: TWsState
}

export type TStoreWsUser = {
  wsUser: TWsState
}
