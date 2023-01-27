import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Home } from "../screens/app/Home";
import { AdvertDetails } from "../screens/app/AdvertDetails";
import { UserAdverts } from "../screens/app/UserAdverts";
import { NewAdvert } from "../screens/app/NewAdvert";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AdvertPreview } from "../screens/app/AdvertPreview";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { SignIn } from "../screens/auth/SignIn";
import { AdvertDTO } from "../dtos/AdvertDTO";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";

type AppTabRoutes = {
  home: undefined;
  useradverts: undefined;
  signIn: undefined;
};
export type AppTabNavigatorRouteProps = BottomTabNavigationProp<AppTabRoutes>;
const Tab = createBottomTabNavigator<AppTabRoutes>();

type AppStackRoutes = {
  addetails: { advertID: string; owner: boolean };
  newadvert: { itemID: string | null };
  tabroutes: undefined;
  advertpreview: {
    productData: AdvertDTO;
    // advertImages: PhotoFileDTO[];
    // is_preview?: boolean;
    owner?: boolean;
  };
};

export type AppStackNavigatorRouteProps =
  NativeStackNavigationProp<AppStackRoutes>;
const Stack = createNativeStackNavigator<AppStackRoutes>();

const TabRoutes = () => {
  const { signOut } = useContext(AuthContext);

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
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="useradverts"
        component={UserAdverts}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="tago" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="signIn"
        component={SignIn}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="exit-outline" size={size} color="red" />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            signOut();
          },
        }}
      />
    </Tab.Navigator>
  );
};

export const AppRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="tabroutes" component={TabRoutes} />
      <Stack.Screen name="newadvert" component={NewAdvert} />
      <Stack.Screen name="advertpreview" component={AdvertPreview} />
      <Stack.Screen name="addetails" component={AdvertDetails} />
    </Stack.Navigator>
  );
};
