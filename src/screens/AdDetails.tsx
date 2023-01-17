import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductDetails } from "../components/ProductDetails";
import { Button } from "../components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { TopSection } from "../components/TopSection";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Box, HStack, ScrollView, VStack } from "native-base";
import { Dimensions } from "react-native";
import { itemsForTest } from "../itemsForInterfaceTest/itemsAdverts";
import { useState } from "react";
import { ImagesCarousel } from "../components/ImagesCarousel";

type RouteParamsProps = {
  itemID: string;
};

export function AdDetails() {
  const route = useRoute();
  const { goBack } = useNavigation();
  const { height } = Dimensions.get("window");

  // pegar o item pelo ID
  const { itemID } = route.params as RouteParamsProps;
  const [item, setItem] = useState(itemsForTest[2]);
  const [userLogged, setUserLogged] = useState(itemsForTest[2].user);

  function handleGoBack() {
    goBack();
  }

  return (
    <SafeAreaView>
      <ScrollView h={height - 100} bgColor="gray.600">
        <VStack mb={12}>

          <TopSection
            leftElement={
              <TouchableOpacity onPress={handleGoBack}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            }
          />
          <ImagesCarousel imagesURI={item.uri} isActiveAd={item.isActive}/>
          <ProductDetails />
        </VStack>
      </ScrollView>

      
        {item.user === userLogged ? (
          <VStack bgColor="gray.600" w='full' h={32}  justifyContent="space-around" alignItems='center' bottom={12} p={4}>
            <Button
              icon={<AntDesign name="poweroff" size={16} color="white" />}
              title="Desativar anúncio"
              bgColor="gray.200"
              textColor="white"
              onPress={null}
              w={327}
            />

            <Button

              icon={<Feather name="trash" size={16} color="black" />}
              title="Excluir anúncio"
              bgColor="gray.500"
              textColor="gray.100"
              onPress={handleGoBack}
              w={327}
            />
          </VStack>
        ) : (
          <Button
            isBig
            bgColor="blue.light"
            textColor="white"
            title="Entrar em contato"
            icon={<FontAwesome name="whatsapp" size={24} color="white" />}
          />
        )}
      
    </SafeAreaView>
  );
}
