import { api } from "../api";

export const deleteProduct = async (productID: string) => {
  try {
    const response = await api.delete(`/products/${productID}`);
    return response.data;
  } catch (error) {}
};
