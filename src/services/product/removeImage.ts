import axios from "axios";
import { api } from "../api";

export const removeImage = async (images: any) => {
  try {
    // const reqImage = [image.id] as
    console.log("PREIAMGES", images);
    const deletedImage = await api.delete("/products/images", images);

    console.log("xxx", deletedImage);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.request?.status);
    else console.log(error);
    return false;
  }
};
