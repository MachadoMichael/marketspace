import axios from "axios";
import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import { api } from "../api";

export const removeImage = async (image: PhotoFileDTO) => {
  const productImagesIds = [`${image.id}`];
  try {
    const response = await api.delete("/products/images", {
      productImagesIds,
    } as any);
    console.log(productImagesIds, "response of remove image");
    return true;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.request?.status);
    else console.log(error);
    return false;
  }
};
