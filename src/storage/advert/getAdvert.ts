import axios from "axios";
import { api } from "../../services/api";

export const getAdvert = async (advertID: string) => {
  try {
    const response = await api.get(`/products/${advertID}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.request?.status);
    else console.log(error);
  }
};
