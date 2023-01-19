import axios from "axios";
import { api } from "../api";

export const fetchProducts = async () => {
  try {
    const products = await api.get(`/products`, {});
    console.log("DATABASE PRODUCTS", products.data);
    return products.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.response?.status);
    else console.log(error);
    return false;
  }
};
