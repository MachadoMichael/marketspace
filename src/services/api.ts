import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

export const api = axios.create({
  baseURL: "http://192.168.1.100:3333",
}) as APIInstanceProps;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        signOut();
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};
