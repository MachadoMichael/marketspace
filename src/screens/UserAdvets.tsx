import {
  Center,
  CheckIcon,
  FlatList,
  HStack,
  Select,
  Text,
  View,
  VStack,
} from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { itemsForTest } from "../itemsForInterfaceTest/itemsAdverts";
import { ItemCard } from "../components/ItemCard";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRouteProps } from "../routes/app.routes";

export function UserAdverts() {
  const [userAdverts, setUserAdverts] = useState(itemsForTest);
  const [service, setService] = useState("Todos");
  const { navigate } = useNavigation<AppNavigatorRouteProps>();

  function handleCreateNewAdvert() {
    navigate("createnewadvert");
  }
  return (
    <SafeAreaView>
      <View justifyContent="space-between" p={8}>
        <FlatList
          data={userAdverts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemCard item={item} />}
          horizontal={false}
          numColumns={2}
          bounces={false}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListHeaderComponent={
            <VStack>
              <Center mb={8}>
                <HStack alignItems="center">
                  <Text fontFamily="heading" fontSize="xl">
                    Meus anúncios
                  </Text>
                  <View position="absolute" right={-70}>
                    <TouchableOpacity onPress={handleCreateNewAdvert}>
                      <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </HStack>
              </Center>

              <HStack alignItems="center" justifyContent="space-between" mb={6}>
                <Text>{userAdverts.length} anúncios</Text>

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
                  <Select.Item
                    label="Ativos"
                    value="enable"
                    fontFamily="heading"
                  />
                  <Select.Item
                    label="Desativos"
                    value="disable"
                    fontFamily="heading"
                  />
                </Select>
              </HStack>
            </VStack>
          }
        />
      </View>
    </SafeAreaView>
  );
}
