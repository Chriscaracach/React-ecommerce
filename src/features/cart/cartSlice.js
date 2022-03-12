import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const products = (state) => state.products.value;

export default cartSlice.reducer;
