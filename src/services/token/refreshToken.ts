import { api } from "../api";

export const refreshToken = async (token: string) => {
  const response = await api.post("sessions/refresh-token", { token });

  return response.data as { token: string };
};
