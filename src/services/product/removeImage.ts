import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import { api } from "../api";

export const removeImage = async (images: any) => {
  try {
    await api.delete("/products/images", images);
    return true;
  } catch (error) {
    return false;
  }
};
