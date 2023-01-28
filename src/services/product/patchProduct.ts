import { api } from "../api";

export const patchProduct = async (productID: string, is_active: boolean) => {
  try {
    const response = await api.patch(`/products/${productID}`);
    console.log(response.data);
  } catch (error) {}
};
