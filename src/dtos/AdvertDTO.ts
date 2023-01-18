import { PhotoFileDTO } from "./PhotoFileDTO";
import { ProductDTO } from "./ProductDTO";

export interface AdvertDTO extends ProductDTO {
  images: PhotoFileDTO[];
  is_active: boolean;
}
