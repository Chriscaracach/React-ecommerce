import axios from "axios";

let urlProducts = "https://fakestoreapi.com/products";

export const getProductsFromApi = async (setMethod) => {
  try {
    let response = await axios.get(urlProducts);
    setMethod(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
