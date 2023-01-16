import { api } from "../services/api";
import axios from "axios";

interface UserData {
  userAvatar: any;
  name: string;
  email: string;
  tel: string;
  password: string;
}

export async function addUser({
  userAvatar,
  name,
  email,
  tel,
  password,
}: UserData) {
  try {
    const userForm = new FormData();
    userForm.append("avatar", userAvatar);
    userForm.append("name", name.toLowerCase());
    userForm.append("email", email.toLowerCase());
    userForm.append("tel", tel);
    userForm.append("password", password);

    const newUser = await api.post("/users/", userForm, {
      headers: {
        "Content-Type": "multpart/form-data",
      },
    });

    if (newUser) return true;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
    return false;
  }
}