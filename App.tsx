import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { theme } from "./src/theme";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import { Routes } from "./src/routes";
import { Platform } from "react-native";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Loading } from "./src/components/Loading";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <StatusBar
          barStyle={
            Platform.OS === "android" ? "light-content" : "dark-content"
          }
        />
        <AuthContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
