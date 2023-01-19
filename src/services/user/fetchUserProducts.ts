import { api } from "../api";

export const fetchUserProducts = async () => {
  try {
    const response = await api.get("users/products");
    if (response) return response.data;
  } catch (error) {}
};
