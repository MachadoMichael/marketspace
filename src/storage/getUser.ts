import { api } from "../services/api";

export const getUser = async () => {
  const userData = await api.get("/users/me");
  console.log(userData, "user data");
};
