import axios from "axios";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";

export const userLogin = async (email: string, password: string) => {
  try {
    const userLoginForm = new FormData();
    userLoginForm.append("email", email);
    userLoginForm.append("password", password);
    const userData = await api.post("/sessions/", userLoginForm);
    console.log(userData.data, "this user exist");
    return userData;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
