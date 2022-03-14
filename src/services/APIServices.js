import axios from "axios";

let urlProducts = "https://fakestoreapi.com/products";

export const getProductsFromApi = async () => {
  try {
    let response = await axios.get(urlProducts);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
