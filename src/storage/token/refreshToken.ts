import axios from "axios";
import { api } from "../../services/api";

export const refreshToken = async (token: string) => {
  try {
    const newValidToken = await api.post("sessions/refresh-token", { token });
    console.log(newValidToken.data, "token is valid or not");
    console.log(newValidToken.status, "token XXX");
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
