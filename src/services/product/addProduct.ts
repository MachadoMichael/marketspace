import axios from "axios";
import { AdvertDTO } from "../../dtos/AdvertDTO";
import { ProductDTO } from "../../dtos/ProductDTO";
import { api } from "../api";

export const addProduct = async (productRequest: AdvertDTO) => {
  try {
    const response = await api.post("/products", productRequest);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.request?.status);
    else console.log(error);
  }
};
