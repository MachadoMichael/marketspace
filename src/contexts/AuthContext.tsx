import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { refreshToken } from "../services/token/refreshToken";
import {
  getStorageUser,
  removeStorageUser,
  setStorageUser,
} from "../storage/user";

export interface AuthContextDataProps {
  user: UserDTO | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>();

  const signIn = async (email: string, password: string) => {
    try {
      const user = await api.post("/sessions", {
        email: email.toLowerCase(),
        password,
      });

      if (user) {
        setUser(user.data as UserDTO);
        tokenAuthorization(user.data.token);
        setStorageUser({ email, password });
        refreshToken(user.data.token);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) console.log(error.response?.data);
      else console.log(error);
    }
  };

  const signOut = async () => {
    try {
      setUser(undefined);
      removeStorageUser();
    } catch (error) {}
  };

  const tokenAuthorization = (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const readingStorage = async () => {
    const user = await getStorageUser();
    if (user !== undefined) signIn(user.email, user.password);
  };

  useEffect(() => {
    readingStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
