import { Center, HStack, Text, VStack } from "native-base";
import { FlatList } from "react-native";
import { ProductCard } from "../../components/ProductCard";
import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { HomeHeader } from "../../components/HomeHeader";

import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Input } from "../../components/Input";
import { Filter } from "../../components/Filter";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { SectionUserAdverts } from "../../components/SectionUserAdverts";
import {
  fetchProducts,
  FilterParamsProps,
} from "../../services/product/fetchProducts";

export function Home() {
  const { height } = Dimensions.get("window");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [query, setQuery] = useState("");
  const [params, setParams] = useState<FilterParamsProps>({});
  const [products, setProducts] = useState<any>();

  const handleHideModal = () => {
    bottomSheetRef.current?.close();
  };

  const handleShowModal = () => {
    bottomSheetRef.current?.expand();
  };

  const readProductsOnDB = async () => {
    setProducts(await fetchProducts(params));
  };

  const handleSearch = () => {
    setParams({ ...params, query });
    readProductsOnDB();
  };

  useEffect(() => {
    readProductsOnDB();
  }, [params]);

  useEffect(() => {
    readProductsOnDB();
  }, []);

  return (
    <Center w="full" h="full" pt={height / 20}>
      <FlatList
        data={products}
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
                    <TouchableOpacity onPress={handleSearch}>
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
                value={query}
                onChangeText={setQuery}
              />
            </VStack>
          </>
        }
      />

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={[1, height / 1.4]}
        backgroundStyle={{
          backgroundColor: "white",
        }}
      >
        <Filter
          closeBottomSheet={handleHideModal}
          params={params}
          setParams={setParams}
        />
      </BottomSheet>
    </Center>
  );
}
