import { api } from "../api";

export const getProduct = async (advertID: string) => {
  try {
    const response = await api.get(`/products/${advertID}`);
    return response;
  } catch (error) {}
};
