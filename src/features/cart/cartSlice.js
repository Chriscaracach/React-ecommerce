import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteProductFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => {
        return product.id !== action.payload;
      });
    },
    resetCart: (state) => {
      state.cart = [];
    },
    addQuantityDefault: (state, action) => {
      state.cart.forEach((product) => {
        product.quantity = action.payload;
      });
    },
    modifyQuantity: (state, action) => {
      let productIndex = state.cart.findIndex(
        (element) => element.id === action.payload.productId
      );
      state.cart[productIndex].quantity = action.payload.amount;
    },
  },
});

export const {
  addProductToCart,
  deleteProductFromCart,
  addQuantityDefault,
  modifyQuantity,
  resetCart,
} = cartSlice.actions;

export const cartProducts = (state) => state.cart.value;

export default cartSlice.reducer;
