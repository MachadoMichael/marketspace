import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
