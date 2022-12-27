import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { ProductInfo } from "../screens/ProductInfo";
import { UserAdverts } from "../screens/UserAdvets";
import { CreateNewAdvert } from "../screens/CreateNewAdvert";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AdvertPreview } from "../screens/AdvertPreview";
import { ViewUserAdvert } from "../screens/ViewUserAdvert";

type AppTabRoutes = {
  home: undefined;
  useradverts: undefined;
};
export type AppTabNavigatorRouteProps = BottomTabNavigationProp<AppTabRoutes>;
const Tab = createBottomTabNavigator<AppTabRoutes>();

type AppStackRoutes = {
  productinfo: undefined;
  createnewadvert: undefined;
  tabroutes: undefined;
  advertpreview: undefined;
  viewuseradvert: undefined;
};

export type AppStackNavigatorRouteProps =
  NativeStackNavigationProp<AppStackRoutes>;
const Stack = createNativeStackNavigator<AppStackRoutes>();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={gestureHandlerRootHOC(Home)}
        options={{
          tabBarHideOnKeyboard: true,
        }}
      />

      <Tab.Screen name="useradverts" component={UserAdverts} />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="tabroutes" component={TabRoutes} />
      <Stack.Screen name="createnewadvert" component={CreateNewAdvert} />
      <Stack.Screen name="advertpreview" component={AdvertPreview} />
      <Stack.Screen name="productinfo" component={ProductInfo} />
      <Stack.Screen name="viewuseradvert" component={ViewUserAdvert} />
    </Stack.Navigator>
  );
}
