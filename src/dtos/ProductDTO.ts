import { PhotoFileDTO } from "./PhotoFileDTO";

export interface ProductDTO {
  id?: string;
  name: string;
  description: string;
  is_new: boolean;
  accept_trade: boolean;
  payment_methods: string[];
  price: number;
  images?: PhotoFileDTO[];
}
