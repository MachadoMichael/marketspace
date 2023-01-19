import { api } from "../api";

export const getSelectedProduct = async (productID: string) => {
  try {
    const response = api.get(`/products/${productID}`);
    return response;
  } catch (error) {}
};
