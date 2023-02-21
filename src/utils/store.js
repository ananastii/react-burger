export const getAllIngredients = (store) => store.ingredients;
export const getConstructor = (store) => store.burgerConstructor;
export const getOrder = (store) => store.order;
export const getFillings = (store) => store.burgerConstructor.fillings;
export const getUser = (store) => store.auth.user;
export const getPassword = (store) => store.auth.password;
export const getPwdResetRequested = (store) => store.auth.pwdResetRequested;
export const getPwdSubmitSuccess = (store) => store.auth.pwdSubmitSuccess;
