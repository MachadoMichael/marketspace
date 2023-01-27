import { PaymentMethodsDTO } from "./PaymentMethodsDTO";
import { PhotoFileDTO } from "./PhotoFileDTO";

export interface AdvertDTO {
  name: string;
  description: string;
  is_new: boolean;
  accept_trade: boolean;
  payment_methods: string[] | PaymentMethodsDTO[];
  price: number;
  product_images: PhotoFileDTO[];
  is_active?: boolean;
}
