import { AdvertDTO } from "./AdvertDTO";

export interface ProductResponseDTO extends AdvertDTO {
  id: string;
  created_at: string;
  upload_at: string;
  user_id: string;
}
