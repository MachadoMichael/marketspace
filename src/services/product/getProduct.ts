import { api } from "../api";

export const getProduct = async (productID: string) => {
  try {
    const response = await api.get(`/products/${productID}`);
    console.log(response.data, "getProduct");
    return response;
  } catch (error) {}
};
