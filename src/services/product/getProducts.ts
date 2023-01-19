import axios from "axios";
import { api } from "../api";

export const getProducts = async () => {
  const id = "7f3227d7-be3f-47a6-81ab-ad742a546ade";
  try {
    const products = await api.get(`/products/${id}`);
    console.log(products, "<-- All products");
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
