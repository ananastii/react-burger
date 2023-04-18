import { TStoreAuth, TStoreConstructor, TStoreIngredients, TStoreOrder, TStoreWs, TStoreWsUser } from "../services/types/state";

export const getAllIngredients = (store: TStoreIngredients) => store.ingredients;
export const getConstructor = (store: TStoreConstructor) => store.burgerConstructor;
export const getOrder = (store: TStoreOrder) => store.order;
export const getFillings = (store: TStoreConstructor) => store.burgerConstructor.fillings;
export const getUser = (store: TStoreAuth) => store.auth.user;
export const getPassword = (store: TStoreAuth) => store.auth.password;
export const getPwdResetRequested = (store: TStoreAuth) => store.auth.pwdResetRequested;
export const getPwdSubmitSuccess = (store: TStoreAuth) => store.auth.pwdSubmitSuccess;
export const getOrdersFeed = (store: TStoreWs) => store.wsAll.orders;
export const getTotal = (store: TStoreWs) => store.wsAll.total;
export const getTotalToday = (store: TStoreWs) => store.wsAll.totalToday;
export const getOrdersUser = (store: TStoreWsUser) => store.wsUser.orders;
