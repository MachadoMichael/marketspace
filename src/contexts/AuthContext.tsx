import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { refreshToken } from "../services/token/refreshToken";
import {
  getStorageToken,
  setStorageToken,
  removeStorageToken,
} from "../storage/storageToken";

import {
  getStorageUser,
  removeStorageUser,
  setStorageUser,
} from "../storage/storageUser";

export interface AuthContextDataProps {
  userLogged: UserDTO | undefined;
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
  const [userLogged, setUserLogged] = useState<UserDTO>();

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/sessions", {
        email: email.toLowerCase(),
        password,
      });

      if (response) {
        settingUserSettings(response.data);
        setStorageUser({ email, password });
        setStorageToken(response.data.token);
      }
    } catch (error) {
      throw error;
    }
  };

  const settingUserSettings = (user: any) => {
    setUserLogged(user as UserDTO);
    api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    refreshToken(user.token);
  };

  const signOut = async () => {
    try {
      setUserLogged(undefined);
      removeStorageUser();
      removeStorageToken();
    } catch (error) {}
  };

  const readingStorage = async () => {
    const user = await getStorageUser();
    if (user !== undefined) signIn(user.email, user.password);
  };

  useEffect(() => {
    readingStorage();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);
    return () => subscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
