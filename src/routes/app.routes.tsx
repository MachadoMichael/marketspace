import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { AdDetails } from "../screens/AdDetails";
import { UserAdsList } from "../screens/UserAdsList";
import { AdForm } from "../screens/AdForm";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AdPreview } from "../screens/AdPreview";
import { UserAdDetails } from "../screens/UserAdDetails";

type AppTabRoutes = {
  home: undefined;
  useradslist: undefined;
};
export type AppTabNavigatorRouteProps = BottomTabNavigationProp<AppTabRoutes>;
const Tab = createBottomTabNavigator<AppTabRoutes>();

type AppStackRoutes = {
  addetails: { itemID: string };
  adform: { itemID: string | null };
  tabroutes: undefined;
  adpreview: undefined;
  useraddetails: undefined;
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
        component={Home}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            zIndex: -1,
          },
        }}
      />

      <Tab.Screen name="useradslist" component={UserAdsList} />
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
      <Stack.Screen name="adform" component={AdForm} />
      <Stack.Screen name="adpreview" component={AdPreview} />
      <Stack.Screen name="addetails" component={AdDetails} />
      <Stack.Screen name="useraddetails" component={UserAdDetails} />
    </Stack.Navigator>
  );
}
