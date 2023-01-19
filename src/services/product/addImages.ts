import axios from "axios";
import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import { api } from "../api";

export const addImages = async (
  product_id: string,
  images: PhotoFileDTO[]
) => {
  try {
    const response = await api.post("/products/images", { product_id, images });
    if (response) return true;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.request?.status);
    else console.log(error);
    return false;
  }
};
