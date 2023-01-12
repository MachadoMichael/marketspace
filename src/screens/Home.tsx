import {
  Center,
  // FlatList,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { FlatList } from 'react-native'
import { ItemCard } from "../components/ItemCard";
import { useEffect, useRef, useState } from "react";
import { ItemDTO } from "../dtos/ItemDTO";
import { Dimensions } from "react-native";
import { HomeHeader } from "../components/HomeHeader";

import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Input } from "../components/Input";
import { Filter } from "../components/Filter";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { AppTabNavigatorRouteProps } from "../routes/app.routes";
import { itemsForTest } from "../itemsForInterfaceTest/itemsAdverts";
import { SectionUserAds } from "../components/SectionUserAds";

export function Home() {
  const { height } = Dimensions.get("window");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { navigate } = useNavigation<AppTabNavigatorRouteProps>();
  const [initialItemList, setInitialItemList] =
    useState<ItemDTO[]>(itemsForTest);
  const [itemList, setItemList] = useState<ItemDTO[]>(itemsForTest);
  const [inputFilter, setInputFilter] = useState("");
  const snapPoints = [1, height - 110];

  useEffect(() => {
    setItemList(itemsForTest);
    setInitialItemList(itemsForTest);
  }, []);

  function handleHideModal() {
    bottomSheetRef.current?.close();
  }

  function handleShowModal() {
    bottomSheetRef.current?.expand();
  }

  function handleTitleFilter() {
    if (inputFilter === "") {
      setItemList(initialItemList);
    } else {
      const filteredList = initialItemList.filter((item) =>
        item.name.includes(inputFilter)
      );
      setItemList(filteredList);
    }
  }

  return (

    <Center justifyContent={"space-between"} >
      <FlatList
        data={itemList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (<ItemCard item={item} />)}
        horizontal={false}
        numColumns={2}
        bounces={false}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        ListHeaderComponent={
          <ScrollView mt={8}>
            <HomeHeader />

            <VStack mt={4} justifyContent="center">
              <Text mb={2} color="gray.300">
                Seus produtos anunciados para venda
              </Text>

              <SectionUserAds />
            </VStack>

            <VStack w={327} mt={8} mb={4}>
              <Text mb={2}>Compre produtos variados</Text>

              <Input
                placeholder="Buscar anúncio"
                w={327}
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
          </ScrollView>
        }
      />

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: "white",
        }}
      >
        <Filter
          closeBottomSheet={handleHideModal}
          itemList={itemList}
          setItemList={setItemList}
        />
      </BottomSheet>

    </Center>


  );
}
