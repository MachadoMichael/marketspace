import { SignIn } from "../screens/SignIn";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignUp } from "../screens/SignUp";
import { Home } from "../screens/Home";

type AppRoutes = {
  home: undefined;
  signUp: undefined;
};

export type AppNavigatorRouteProps = NativeStackNavigationProp<AppRoutes>;

const { Screen, Navigator } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
