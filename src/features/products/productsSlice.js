import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let urlProducts = "https://fakestoreapi.com/products";

const initialState = {
  products: [],
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (dispatch, getState) => {
    return await axios
      .get(urlProducts)
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const products = (state) => state.products.value;

export default productsSlice.reducer;
