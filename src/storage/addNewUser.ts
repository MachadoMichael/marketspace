import { api } from "../services/api";
import axios from "axios";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";

interface UserData {
  userAvatar: PhotoFileDTO;
  name: string;
  email: string;
  tel: string;
  password: string;
}

export async function addNewUser({
  userAvatar,
  name,
  email,
  tel,
  password,
}: UserData) {
  // const userPhotoUploadForm = new FormData();
  // userPhotoUploadForm.append("avatar", userData.userAvatar);
  try {
    const newUser = await api.post(
      "/users/",
      {
        avatar: userAvatar,
        name,
        email,
        tel,
        password,
      },
      {
        headers: {
          "Content-Type": "multpart/form-data",
        },
      }
    );
    console.log(newUser.data, "<-- newUser");
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
}
