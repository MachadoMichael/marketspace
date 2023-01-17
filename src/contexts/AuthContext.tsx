import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { Alert } from "react-native";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { userLogin } from "../storage/userLogin";

export interface AuthContextDataProps {
  user: UserDTO | undefined;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>();

  const logIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", {
        email: email.toLowerCase(),
        password,
      });
      setUser(data as UserDTO);
      console.log("USUARIO LOGadO", data);
    } catch (error) {
      if (axios.isAxiosError(error)) console.log(error.response?.data);
      else console.log(error, "XX");
    }
  };

  const logOut = async () => {
    try {
      setUser(undefined);
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
