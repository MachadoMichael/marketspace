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

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}
      />
      {fontsLoaded ? <Routes /> : false}
    </NativeBaseProvider>
  );
}
