import { Box } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";

import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { userLogged } = useAuth();

  return (
    <Box flex={1} bg="blue.basic">
      <NavigationContainer>
        {userLogged ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
