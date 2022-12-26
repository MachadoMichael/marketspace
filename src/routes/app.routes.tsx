import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { SignUp } from "../screens/SignUp";
import { Home } from "../screens/Home";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { ProductDetails } from "../screens/ProductDetails";
import { UserAdverts } from "../screens/UserAdvets";
import { CreateNewAdvert } from "../screens/CreateNewAdvert";

type AppRoutes = {
  home: undefined;
  signUp: undefined;
  productdetails: undefined;
  useradverts: undefined;
  createnewadvert: undefined;
};

export type AppNavigatorRouteProps = BottomTabNavigationProp<AppRoutes>;

const { Screen, Navigator } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="home"
        component={gestureHandlerRootHOC(Home)}
        options={{
          tabBarHideOnKeyboard: true,

          tabBarStyle: {},
        }}
      />
      <Screen name="signUp" component={SignUp} />
      <Screen name="productdetails" component={ProductDetails} />
      <Screen name="useradverts" component={UserAdverts} />
      <Screen name="createnewadvert" component={CreateNewAdvert} />
    </Navigator>
  );
}
