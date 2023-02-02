import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN_STORAGE } from "./variables";

export const setStorageToken = async (token: string) => {
  await AsyncStorage.setItem(USER_TOKEN_STORAGE, token);
};

export const getStorageToken = async () => {
  const response = await AsyncStorage.getItem(USER_TOKEN_STORAGE);
  return response;
};

export const removeStorageToken = async () => {
  try {
    await AsyncStorage.removeItem(USER_TOKEN_STORAGE);
  } catch (error) {
    console.log(error);
  }
};
