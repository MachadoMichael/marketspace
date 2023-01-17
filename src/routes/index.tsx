import { Box } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";

import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { user } = useAuth();

  return (
    <Box flex={1} bg="blue.basic">
      <NavigationContainer>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
