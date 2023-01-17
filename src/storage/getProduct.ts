import { api } from "../services/api";

export const getProduct = async (name: string) => {
  const product = await api.get(`/product/${name}`);
  console.log(product, "<-- product");
  //   return product
};
