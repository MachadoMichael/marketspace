import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppTabNavigatorRouteProps } from "../routes/app.routes";
import { HStack, Text, VStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "react-query";
import { fetchUserProducts } from "../services/user/fetchUserProducts";
import { AdvertDTO } from "../dtos/AdvertDTO";
import { useEffect } from "react";

export const SectionUserAdverts = () => {
  const { navigate } = useNavigation<AppTabNavigatorRouteProps>();
  const { data } = useQuery("user-products", fetchUserProducts);

  const activeAdverts: AdvertDTO[] = data?.filter(
    (advert: AdvertDTO) => advert.is_active === true
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    () => queryClient.invalidateQueries("user-prodcuts");
  }, []);
  function handleGoToUserAdverts() {
    navigate("useradverts");
  }

  return (
    <TouchableOpacity onPress={handleGoToUserAdverts}>
      <HStack
        w={327}
        h={66}
        rounded={6}
        bgColor={"blue.lowOpacity"}
        alignItems="center"
        justifyContent="space-evenly"
        flexDirection="row"
      >
        <HStack alignItems="center">
          <AntDesign name="tago" size={24} color="black" />
          <VStack ml={2}>
            <Text fontSize="lg" fontFamily="heading">
              {activeAdverts?.length}
            </Text>
            <Text fontSize="xs">anúncios ativos</Text>
          </VStack>
        </HStack>

        <HStack>
          <Text fontSize="xs" fontFamily="heading" color="blue.basic">
            Meus anúncios
          </Text>
          <AntDesign name="arrowright" size={18} color="black" />
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
};
