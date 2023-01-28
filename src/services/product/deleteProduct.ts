import { api } from "../api";

export const deleteProduct = async (productID: string) => {
  try {
    const response = await api.delete(`/products/${productID}`);
    console.log("DELETE PRODUCT", response.data);
    return response.data;
  } catch (error) {}
};
