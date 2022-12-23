import { SignIn } from "../screens/SignIn";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { SignUp } from "../screens/SignUp";
import { Home } from "../screens/Home";

type AppRoutes = {
  home: undefined;
  signUp: undefined;
};

export type AppNavigatorRouteProps = BottomTabNavigationProp<AppRoutes>;

const { Screen, Navigator } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
