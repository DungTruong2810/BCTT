import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const reducer = combineReducers({
  cart: cartSlice,
});
const store = configureStore({
  reducer,
});
export default store;
