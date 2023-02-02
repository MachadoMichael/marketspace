import axios from "axios";
import { AdvertDTO } from "../../dtos/AdvertDTO";
import { api } from "../api";

export const addAdvert = async (productDataBody: AdvertDTO) => {
  try {
    const response = await api.post("/products", productDataBody);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.request?.status);
    else console.log(error);
  }
};
