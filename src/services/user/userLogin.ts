import axios from "axios";
import { api } from "../api";

export const userLogin = async (email: string, password: string) => {
  try {
    const userLoginForm = new FormData();
    userLoginForm.append("email", email);
    userLoginForm.append("password", password);
    const userData = await api.post("/sessions/", userLoginForm);

    return userData;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
