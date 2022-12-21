import { Box } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <Box flex={1} bg="blue.basic">
      <NavigationContainer>
        {isLogged === true ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
