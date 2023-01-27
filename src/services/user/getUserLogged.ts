import { api } from "../api";

export const getUserLogged = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {}
};
