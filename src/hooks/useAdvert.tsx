import { useContext } from "react";
import { AdvertContext } from "../contexts/AdvertContext";

export const useAdvert = () => {
  const context = useContext(AdvertContext);
  return context;
};
