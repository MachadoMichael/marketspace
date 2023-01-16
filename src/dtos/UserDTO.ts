import { PhotoFileDTO } from "./PhotoFileDTO";

export interface UserDTO {
  name: string;
  email: string;
  tel: string;
  id: string;
  avatar: PhotoFileDTO;
  created_at: string;
  updated_at: string;
}
