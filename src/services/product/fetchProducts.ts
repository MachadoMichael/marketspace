import axios from "axios";
import { api } from "../api";

import { PaymentMethodsDTO } from "../../dtos/PaymentMethodsDTO";

export interface FilterParamsProps {
  query?: string;
  is_new?: boolean;
  accept_trade?: boolean;
  payment_methods?: PaymentMethodsDTO[];
}

export const fetchProducts = async () => {
  const params: FilterParamsProps = {};

  try {
    const response = await api.get("/products", { params } as any);
    console.log("DATABASE PRODUCTS", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error.response?.data, error.response?.status);
    else console.log(error);
    return false;
  }
};
