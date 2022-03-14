import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let urlProducts = "https://fakestoreapi.com/products";

const initialState = {
  products: [],
  cart: [],
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (dispatch, getState) => {
    return await axios
      .get(urlProducts)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { addToCart } = productsSlice.actions;

export const products = (state) => state.products.value;

export default productsSlice.reducer;
