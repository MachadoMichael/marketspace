import axios from "axios";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";

interface ProductProps {
  id?: string;
  name: string;
  description: string;
  is_new: boolean;
  price: string;
  accept_trade: boolean;
  payment_methods: string[];
  images: PhotoFileDTO[];
}

export const addProduct = async (ProductRequest: ProductProps) => {
  try {
    const response = await api.post("/products", ProductRequest, {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzM5NTg4MzQsImV4cCI6MTY3NDA0NTIzNCwic3ViIjoiZjVmNmE2OWUtNDBmMy00OWViLTkyNWUtZmJiZDllNjkyZDUzIn0.gkR9_vEd_qbYe0atsINWFrX8Hlg9b9KAv6qqbkdnkYo",
      },
    });
    ProductRequest.id = response.data.id;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
