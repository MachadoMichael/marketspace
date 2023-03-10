import { SignIn } from "../screens/auth/SignIn";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignUp } from "../screens/auth/SignUp";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRouteProps = NativeStackNavigationProp<AuthRoutes>;

const { Screen, Navigator } = createNativeStackNavigator<AuthRoutes>();

export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
};
