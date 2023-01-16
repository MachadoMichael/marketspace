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
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Ionicons } from '@expo/vector-icons';

type AppTabRoutes = {
  home: undefined;
  useradslist: undefined;
  logout: undefined;
};
export type AppTabNavigatorRouteProps = BottomTabNavigationProp<AppTabRoutes>;
const Tab = createBottomTabNavigator<AppTabRoutes>();

type AppStackRoutes = {
  addetails: { itemID: string };
  adform: { itemID: string | null };
  tabroutes: undefined;
  adpreview: { itemID: string };
};

export type AppStackNavigatorRouteProps =
  NativeStackNavigationProp<AppStackRoutes>;
const Stack = createNativeStackNavigator<AppStackRoutes>();

function TabRoutes() {
  const { signOut } = useContext(AuthContext)


  function handleLogout() {
    signOut()
    return null
  }

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
          tabBarIcon: ({ color , size}) => (<Feather name="home" size={size} color={color} />)
        }}
      />

      <Tab.Screen name="useradslist" component={UserAdsList} options={{
        tabBarIcon: ({ color, size }) => (<AntDesign name="tago" size={size} color={color} />)
      }} />

      <Tab.Screen name="logout" component={handleLogout} options={{
        tabBarIcon: ({ size }) => (<Ionicons name="exit-outline" size={size} color="red" />)
      }} />
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
    </Stack.Navigator>
  );
}
