import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductDetails } from "../../components/ProductDetails";
import { Button } from "../../components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TopSection } from "../../components/TopSection";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { ScrollView, VStack } from "native-base";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { ImagesCarousel } from "../../components/ImagesCarousel";

import { AppStackNavigatorRouteProps } from "../../routes/app.routes";
import { AdvertDTO } from "../../dtos/AdvertDTO";
import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import { getSelectedProduct } from "../../services/product/getSelectedProduct";
import { Loading } from "../../components/Loading";
import { api } from "../../services/api";

interface RouteParamsProps {
  advertID: string;
  owner: boolean;
}

export const AdvertDetails = () => {
  const route = useRoute();
  const { goBack, navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const { height } = Dimensions.get("window");

  // pegar o item pelo ID
  const { advertID, owner } = route.params as RouteParamsProps;
  const [selectedAdvert, setSelectedAdvert] = useState<AdvertDTO>(
    {} as AdvertDTO
  );
  const [images, setImages] = useState<PhotoFileDTO[]>([] as PhotoFileDTO[]);

  useEffect(() => {
    getSelectedAdvert();
  }, []);

  const getSelectedAdvert = async () => {
    const response = await getSelectedProduct(advertID);

    if (response) {
      setSelectedAdvert(response.data);
      console.log(response.data.product_images, "IMAGES");
    }
  };

  // const advertConstructor = (response: any) => {
  //   return {} as AdvertDTO;
  // };

  const handleGoBack = () => {
    goBack();
  };

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

          {selectedAdvert.product_images && selectedAdvert.is_active ? (
            <>
              <ImagesCarousel
                images={selectedAdvert.product_images}
                isActiveAd={selectedAdvert.is_active}
              />
              <ProductDetails advert={selectedAdvert} />
            </>
          ) : (
            <Loading />
          )}
        </VStack>
      </ScrollView>

      {owner ? (
        <VStack
          bgColor="gray.600"
          w="full"
          h={32}
          justifyContent="space-around"
          alignItems="center"
          bottom={12}
          p={4}
        >
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
};
