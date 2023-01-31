import { Box, HStack, Image, Text, View, VStack } from "native-base";
import { Button } from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigatorRouteProps } from "../routes/app.routes";
import { getUserLogged } from "../services/user/getUserLogged";
import { api } from "../services/api";
import { useQuery } from "react-query";
import { Loading } from "./Loading";
import { Dimensions } from "react-native";

export const HomeHeader = () => {
  const { navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const { width } = Dimensions.get("window");
  const { data } = useQuery("user-selected", getUserLogged);

  const handleGoAdvertForm = () => {
    navigate("createoreditadvert", { advertID: null });
  };

  return (
    <HStack w={"full"} justifyContent="space-between" mt={4}>
      <HStack>
        {data ? (
          <Box
            rounded="full"
            w={45}
            h={45}
            borderColor="blue.basic"
            borderWidth={2}
          >
            <Image
              w={"full"}
              h={"full"}
              shadow={5}
              rounded={9999}
              source={{ uri: `${api.defaults.baseURL}/images/${data.avatar}` }}
              alt="user-avatar"
            />
          </Box>
        ) : (
          <Loading />
        )}

        <VStack ml={2}>
          <Text fontSize="md">Boas vindas,</Text>
          <Text fontSize="md" fontFamily="heading">
            {data?.name.substr(0, 7)}
          </Text>
        </VStack>
      </HStack>

      <Button
        title="Criar anúncio"
        bgColor="gray.200"
        textColor="white"
        icon={<Ionicons name="add" size={24} color="white" />}
        onPress={handleGoAdvertForm}
        w={width / 2.7}
      />
    </HStack>
  );
};
