import { Box, HStack, Image, Text, View, VStack } from "native-base";
import { Button } from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigatorRouteProps } from "../routes/app.routes";
import { useAuth } from "../hooks/useAuth";
import { userLogin } from "../services/user/userLogin";
import { useEffect, useState } from "react";
import { getUserLogged } from "../services/user/getUserLogged";
import { api } from "../services/api";

interface UserData {
  avatar: string;
  email: string;
  id: string;
  name: string;
  tel: string;
}

export const HomeHeader = () => {
  const { navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const [user, setUser] = useState<UserData>();

  function handleGoAdvertForm() {
    navigate("newadvert", { itemID: null });
  }

  const getUserData = async () => {
    const response = await getUserLogged();
    response !== undefined ? setUser(response) : false;
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <HStack w={327} justifyContent="space-between" mt={4}>
      <HStack>
        {user !== undefined ? (
          <Box
            rounded="full"
            w={45}
            h={45}
            borderColor="blue.basic"
            borderWidth={2}
          >
            <Image
              w={'full'}
              h={'full'}
              shadow={5}
              rounded={9999}
              source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
              alt="userAvatar"
            />
          </Box>
        ) : (
          false
        )}

        <VStack ml={2}>
          <Text fontSize="md">Boas vindas,</Text>
          <Text fontSize="md" fontFamily="heading">
            Maria!
          </Text>
        </VStack>
      </HStack>

      <Button
        title="Criar anúncio"
        bgColor="gray.200"
        textColor="white"
        icon={<Ionicons name="add" size={24} color="white" />}
        onPress={handleGoAdvertForm}
      />
    </HStack>
  );
};
