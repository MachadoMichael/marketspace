import {
  Box,
  Center,
  CheckIcon,
  HStack,
  Select,
  Text,
  VStack,
} from "native-base";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useState } from "react";

import { ProductCard } from "../../components/ProductCard";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigatorRouteProps } from "../../routes/app.routes";
import { fetchUserProducts } from "../../services/user/fetchUserProducts";
import { useQuery } from "react-query";
import { AdvertDTO } from "../../dtos/AdvertDTO";
import { ProductResponseDTO } from "../../dtos/ProductResponseDTO";

export const UserAdverts = () => {
  const [service, setService] = useState("Todos");
  const { navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const { data } = useQuery("user-products", fetchUserProducts);

  function handleToAdForm() {
    navigate("newadvert", { itemID: null });
  }

  const userAdvertsData: ProductResponseDTO[] = data;

  const userFilteredAdvertList =
    service === "enable"
      ? userAdvertsData?.filter((advert) => advert.is_active === true)
      : service === "disable"
      ? userAdvertsData.filter((ad) => ad.is_active === false)
      : userAdvertsData;

  return (
    <SafeAreaView>
      <Box justifyContent="space-between" p={8} pb={0}>
        <VStack>
          <Center mb={8}>
            <HStack alignItems="center">
              <Text fontFamily="heading" fontSize="xl">
                Meus anúncios
              </Text>
              <Box position="absolute" right={-70}>
                <TouchableOpacity onPress={handleToAdForm}>
                  <AntDesign name="plus" size={24} color="black" />
                </TouchableOpacity>
              </Box>
            </HStack>
          </Center>

          <HStack alignItems="center" justifyContent="space-between" mb={6}>
            <Text>{userFilteredAdvertList?.length} anúncios</Text>

            <Select
              selectedValue={service}
              minWidth="150"
              accessibilityLabel="Choose Service"
              placeholder="Filtro"
              _selectedItem={{
                bg: "blue.light",
                rounded: 8,
                endIcon: <CheckIcon size="5" color="white" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setService(itemValue)}
            >
              <Select.Item label="Todos" value="" fontFamily="heading" />
              <Select.Item label="Ativos" value="enable" fontFamily="heading" />
              <Select.Item
                label="Desativados"
                value="disable"
                fontFamily="heading"
              />
            </Select>
          </HStack>
        </VStack>

        <FlatList
          data={userFilteredAdvertList ? userFilteredAdvertList : []}
          keyExtractor={(item) => item.description + item.id}
          renderItem={({ item }) => <ProductCard product={item} isUserAdvert />}
          horizontal={false}
          numColumns={2}
          bounces={false}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </Box>
    </SafeAreaView>
  );
};
