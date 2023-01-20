import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import { api } from "../api";

export const removeImage = async (image: PhotoFileDTO) => {
  try {
    const response = await api.delete("/products/images", {
      data: { productImagesIds: [image.id] },
    });
    return image;
  } catch (error) {}
};
