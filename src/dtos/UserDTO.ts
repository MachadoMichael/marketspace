import { PhotoFileDTO } from "./PhotoFileDTO";

export interface UserDTO {
  token: string;
  user: UserDataDTO;
}
interface UserDataDTO {
  name: string;
  email: string;
  tel: string;
  id: string;
  avatar: PhotoFileDTO;
  created_at: string;
  updated_at: string;
}
