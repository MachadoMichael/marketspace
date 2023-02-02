import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./variables";

export interface UserStorage {
  email: string;
  password: string;
}

export const setStorageUser = async ({ email, password }: UserStorage) => {
  try {
    await AsyncStorage.setItem(
      USER_STORAGE,
      JSON.stringify({ email, password })
    );
  } catch (error) {
    console.log(error);
  }
};

export const getStorageUser = async () => {
  try {
    const userStringfy = await AsyncStorage.getItem(USER_STORAGE);
    if (userStringfy) {
      const user: UserStorage = JSON.parse(userStringfy);
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeStorageUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE);
  } catch (error) {
    console.log(error);
  }
};
