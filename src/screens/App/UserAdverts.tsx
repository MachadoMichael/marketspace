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
import { useEffect, useState } from "react";

import { ItemCard } from "../../components/ItemCard";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigatorRouteProps } from "../../routes/app.routes";
import { fetchUserProducts } from "../../services/user/fetchUserProducts";
import { ProductResponseDTO } from "../../services/product/fetchProducts";
import { useQuery } from "react-query";

export const UserAdverts = () => {
  const [service, setService] = useState("Todos");
  const { navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const { data } = useQuery("user-products", fetchUserProducts);

  function handleToAdForm() {
    // navigate("adform", { itemID: null });
  }

  // const userFilteredAdList =
  //   service === 'enable' ? userAds.filter(ad => ad.isActive === true)
  //     : service === 'disable' ? userAds.filter(ad => ad.isActive === false) : userAds;

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
            <Text>{data?.length} anúncios</Text>

            <Select
              selectedValue={service}
              minWidth="150"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
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
                label="Desativos"
                value="disable"
                fontFamily="heading"
              />
            </Select>
          </HStack>
        </VStack>

        <FlatList
          data={data ? data : []}
          keyExtractor={(item) => item.description + item.id}
          renderItem={({ item }) => <ItemCard item={item} isUserAd />}
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
