import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { userLogin } from "../storage/userLogin";

export interface AuthContextDataProps {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  const signIn = async (email: string, password: string) => {
    try {
      const userData = await api.post("/sessions/", { email, password });
      console.log(userData.data(), "this user exist");
    } catch (error) {
      if (axios.isAxiosError(error)) console.log(error.response?.data);
      else console.log(error);
    }
  };

  async function signOut() {
    try {
      setUser({} as UserDTO);
    } catch (error) {}
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
