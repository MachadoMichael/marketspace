import { ProductDTO } from "../../dtos/ProductDTO";
import { api } from "../api";

export const getProducts = async () => {
  try {
    const products = await api.get(`/products`);
    return products;
  } catch (error) {}
};
