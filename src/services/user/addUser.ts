import { api } from "../api";
import axios from "axios";

interface UserData {
  userAvatar: any;
  name: string;
  email: string;
  tel: string;
  password: string;
}

export const addUser = async ({
  userAvatar,
  name,
  email,
  tel,
  password,
}: UserData) => {
  try {
    const userForm = new FormData();
    userForm.append("avatar", userAvatar);
    userForm.append("name", name.toLowerCase());
    userForm.append("email", email.toLowerCase());
    userForm.append("tel", tel);
    userForm.append("password", password);

    await api.post("/users", userForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
    return false;
  }
};
