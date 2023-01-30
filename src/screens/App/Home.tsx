import { Center, HStack, ScrollView, Text, VStack } from "native-base";
import { FlatList } from "react-native";
import { ProductCard } from "../../components/ProductCard";
import { useEffect, useRef, useState } from "react";
import { AdvertDTO } from "../../dtos/AdvertDTO";
import { Dimensions } from "react-native";
import { HomeHeader } from "../../components/HomeHeader";

import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Input } from "../../components/Input";
import { Filter } from "../../components/Filter";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { AppTabNavigatorRouteProps } from "../../routes/app.routes";
import { SectionUserAdverts } from "../../components/SectionUserAdverts";
import {
  fetchProducts,
  FilterParamsProps,
} from "../../services/product/fetchProducts";
import { useQuery } from "react-query";
import { api } from "../../services/api";

export function Home() {
  const { height } = Dimensions.get("window");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { navigate } = useNavigation<AppTabNavigatorRouteProps>();

  const [products, setProducts] = useState<any>([]);
  const [inputFilter, setInputFilter] = useState("");

  const { data } = useQuery("fetch-products", fetchProducts);

  function handleHideModal() {
    bottomSheetRef.current?.close();
  }

  function handleShowModal() {
    bottomSheetRef.current?.expand();
  }

  function handleTitleFilter() {
    // if (inputFilter === "") {
    //   setItemList(initialItemList);
    // } else {
    //   const filteredList = initialItemList.filter((item) =>
    //     item.name.includes(inputFilter)
    //   );
    //   setItemList(filteredList);
    // }
  }

  return (
    <Center w="full" h="full" pt='1/6'>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        horizontal={false}
        numColumns={2}
        bounces={false}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        style={{
          width: "80%",
        }}
        ListHeaderComponent={
          <>
            <HomeHeader />

            <VStack mt={4} justifyContent={"center"}>
              <Text mb={2} color={"gray.300"}>
                Seus produtos anunciados para venda
              </Text>

              <SectionUserAdverts />
            </VStack>

            <VStack w={"full"} mt={8} mb={4}>
              <Text color={"gray.300"} mb={2}>
                Compre produtos variados
              </Text>

              <Input
                placeholder={"Buscar anúncio"}
                w={"full"}
                InputRightElement={
                  <HStack w={20}>
                    <TouchableOpacity onPress={handleTitleFilter}>
                      <Feather name="search" size={24} color="black" />
                    </TouchableOpacity>
                    <Text ml={2} mr={2}>
                      |
                    </Text>
                    <TouchableOpacity onPress={handleShowModal}>
                      <Octicons name="filter" size={24} color="black" />
                    </TouchableOpacity>
                  </HStack>
                }
                value={inputFilter}
                onChangeText={setInputFilter}
              />
            </VStack>
          </>
        }
      />

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={[1, height - 400]}
        backgroundStyle={{
          backgroundColor: "white",
        }}
      >
        <Filter
          closeBottomSheet={handleHideModal}
          advertList={products}
          setAdvertList={setProducts}
        />
      </BottomSheet>
    </Center>
  );
}
