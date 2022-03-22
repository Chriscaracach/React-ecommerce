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
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  }
);

export const productsSlice = createSlice({
  name: "products",
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
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  addProductToCart,
  deleteProductFromCart,
  addQuantityDefault,
  modifyQuantity,
} = productsSlice.actions;

export const products = (state) => state.products.value;
export const cartProducts = (state) => state.cart.value;

export default productsSlice.reducer;
