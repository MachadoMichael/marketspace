import { api } from "../api";

export const getProduct = async (advertID: string) => {
  try {
    const response = await api.get(`/products/${advertID}`);
    console.log(response.data, "getProduct");
    return response;
  } catch (error) {}
};
