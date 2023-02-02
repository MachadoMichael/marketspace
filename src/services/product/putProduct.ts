import axios from "axios";
import { AdvertDTO } from "../../dtos/AdvertDTO";
import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import { api } from "../api";

interface BodyPutRequisition {
  id?: string;
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  payment_methods: string[];
  images: PhotoFileDTO[];
}

export const putProduct = async (productData: BodyPutRequisition) => {
  const reqBody = {
    name: productData.name,
    description: productData.description,
    is_new: productData.is_new,
    accept_trade: productData.accept_trade,
    payment_methods: productData.payment_methods,
    price: productData.price,
    images: productData.images,
  };

  try {
    if (productData.id) {
      const response = await api.put(`/products/${productData.id}`, reqBody);

      return response ? true : false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
