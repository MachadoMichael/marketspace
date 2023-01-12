import { createContext, ReactNode, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";

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

  async function signIn(email: string, password: string) {
    try {
      setUser({
        email: "adsadas",
        name: "Michael Machado",
        password: "sdasdas",
        phone: "23123124",
        id: "adsadasda",
      });
    } catch (error) {}
  }

  async function signOut() {
    try {
      setUser({} as UserDTO);
    } catch (error) {}
  }

  console.log(user, "<-- USERXXXX");
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
