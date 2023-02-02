import axios from "axios";
import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import { api } from "../api";

export const addImages = async (product_id: string, images: PhotoFileDTO[]) => {
  try {
    const imagesForm = new FormData();

    images.forEach((image) => imagesForm.append("images", image as any));
    imagesForm.append("product_id", product_id);

    const response = await api.post("/products/images", imagesForm, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    if (response) return true;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.request?.status);
    else console.log(error);
    return false;
  }
};
2;
