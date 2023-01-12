import React from "react";
import { NativeBaseProvider, Center, StatusBar } from "native-base";
import { theme } from "./src/theme";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import { Routes } from "./src/routes";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}
      />
      <AuthContextProvider>

        {fontsLoaded ? <Routes /> : false}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
