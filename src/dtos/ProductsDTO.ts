import { PhotoFileDTO } from "./PhotoFileDTO";
export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: string;
  user_id: string;
  is_new: boolean;
  is_active: boolean;
  accept_trade: boolean;
  created_at: string;
  updated_at: string;
  product_images: PhotoFileDTO[];
  payment_methods: string[];
}
