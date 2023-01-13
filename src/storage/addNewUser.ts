import { api } from "../services/api";
import axios from "axios";

interface UserData {
  avatar: string;
  name: string;
  email: string;
  tel: string;
  password: string;
}

export async function addNewUser(userData: UserData) {
  try {
    const newUser = await api.post("/users/", userData);
    console.log(newUser.data, "<-- newUser");
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
  }
}
