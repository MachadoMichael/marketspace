import { api } from "../api";

export const getUserLogged = async () => {
  const userData = await api.get("/users/me");
  console.log(userData.data, "user data");
};
