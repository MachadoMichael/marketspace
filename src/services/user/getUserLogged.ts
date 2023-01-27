import { api } from "../api";

export const getUserLogged = async () => {
  try {
    const response = await api.get("/users/me");
    console.log(response.data, "user data");
    return response.data;
  } catch (error) {}
};
