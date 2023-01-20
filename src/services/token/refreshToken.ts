import axios from "axios";
import { api } from "../api";

export const refreshToken = async (token: string) => {
  try {
    const newValidToken = await api.post("sessions/refresh-token", { token });
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
