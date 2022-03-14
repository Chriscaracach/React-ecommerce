import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
