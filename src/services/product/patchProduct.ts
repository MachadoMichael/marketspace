import { api } from "../api";

export const patchProduct = async (productID: string, is_active: boolean) => {
  try {
    const response = await api.patch(`/products/${productID}`, { is_active });
  } catch (error) {}
};
