import axios from "axios";
import { api } from "../api";

export const removeImage = async (images: any) => {
  try {
    await api.delete("/products/images", images);

    return true;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.request?.status);
    else console.log(error);
    return false;
  }
};
