import axios from "axios";
import { api } from "../api";
import { AdvertDTO } from "../../dtos/AdvertDTO";

export interface ProductResponseDTO extends AdvertDTO {
  id: string;
  created_at: string;
  upload_at: string;
  user_id: string;
}

export const fetchProducts = async () => {
  try {
    const params = {};
    const response = await api.get<ProductResponseDTO[]>(
      `/products/`
    );
    console.log("DATABASE PRODUCTS", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.response?.status);
    else console.log(error);
    return false;
  }
};
