import {
  Center,
  FlatList,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { ItemCard } from "../components/ItemCard";
import { useCallback, useRef, useState } from "react";
import { ItemDTO } from "../dtos/ItemDTO";
import { Dimensions, SafeAreaView } from "react-native";
import { HomeHeader } from "../components/HomeHeader";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Input } from "../components/Input";
import { Filter } from "../components/Filter";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { AppTabNavigatorRouteProps } from "../routes/app.routes";
import { itemsForTest } from "../itemsForInterfaceTest/itemsAdverts";

export function Home() {
  const { height } = Dimensions.get("window");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { navigate } = useNavigation<AppTabNavigatorRouteProps>();

  const [items, setItems] = useState<ItemDTO[]>(itemsForTest);

  function handleHideModal() {
    bottomSheetRef.current?.close();
  }

  function handleGoToUserAdverts() {
    navigate("useradslist");
  }

  return (
    <View>
      <Center justifyContent={"space-between"}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id + item.name}
          renderItem={({ item }) => <ItemCard item={item} />}
          horizontal={false}
          numColumns={2}
          bounces={false}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListHeaderComponent={
            <ScrollView mt={8}>
              <HomeHeader />

              <VStack mt={4} justifyContent="center">
                <Text mb={2} color="gray.300">
                  Seus produtos anunciados para venda
                </Text>

                <TouchableOpacity onPress={handleGoToUserAdverts}>
                  <HStack
                    w={327}
                    h={66}
                    rounded={6}
                    bgColor="gray.500"
                    alignItems="center"
                    justifyContent="space-evenly"
                  >
                    <HStack alignItems="center">
                      <AntDesign name="tago" size={24} color="black" />
                      <VStack ml={2}>
                        <Text fontSize="lg" fontFamily="heading">
                          4
                        </Text>
                        <Text fontSize="xs">anúncios ativos</Text>
                      </VStack>
                    </HStack>

                    <HStack>
                      <Text
                        fontSize="xs"
                        fontFamily="heading"
                        color="blue.basic"
                      >
                        Meus anúncios
                      </Text>
                      <AntDesign name="arrowright" size={18} color="black" />
                    </HStack>
                  </HStack>
                </TouchableOpacity>
              </VStack>

              <VStack w={327} mt={8} mb={4}>
                <Text mb={2}>Compre produtos variados</Text>

                <Input
                  placeholder="Buscar anúncio"
                  w={327}
                  InputRightElement={
                    <HStack w={20}>
                      <Feather name="search" size={24} color="black" />
                      <Text ml={2} mr={2}>
                        |
                      </Text>
                      <TouchableOpacity
                        onPress={() => bottomSheetRef.current?.expand()}
                      >
                        <Octicons name="filter" size={24} color="black" />
                      </TouchableOpacity>
                    </HStack>
                  }
                />
              </VStack>
            </ScrollView>
          }
        />
      </Center>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[1, height - 260]}
        backgroundStyle={{
          backgroundColor: "white",
        }}
      >
        <Filter closeBottomSheet={handleHideModal} />
      </BottomSheet>
    </View>
  );
}
