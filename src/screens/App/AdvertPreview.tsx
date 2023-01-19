import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { ImagesCarousel } from "../../components/ImagesCarousel";
import { ProductDetails } from "../../components/ProductDetails";
import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import { ProductDTO } from "../../dtos/ProductDTO";
import { AppStackNavigatorRouteProps } from "../../routes/app.routes";
import { addImages } from "../../services/product/addImages";
import { addProduct } from "../../services/product/addProduct";

type RouteParamsProps = {
  productData: ProductDTO;
  advertImages: PhotoFileDTO[];
  is_preview?: boolean;
  owner?: boolean;
};

export const AdvertPreview = () => {
  const { goBack, navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const route = useRoute();
  const { productData, advertImages, is_preview, owner } =
    route.params as RouteParamsProps;

  const handleGoBack = () => {
    goBack();
  };

  const handleOnSubmit = async () => {
    const response = await addProduct(productData);
    if (response) {
      const advertID = response.data.id;

      console.warn("ProductID", advertID);

      const imagesAreAdded = await addImages(advertID, advertImages);
      if (imagesAreAdded) navigate("addetails", { advertID, owner: true });
    }
  };

  return (
    <View flex={1}>
      <Center h={100} bgColor="blue.light">
        <Text fontFamily="heading" color="white">
          Pré-visulização do anúncio
        </Text>
        <Text color="white">É assim que seu produto vai aparecer!</Text>
      </Center>

      <ScrollView>
        <ImagesCarousel images={advertImages} isActiveAd />
        <ProductDetails
          advert={{
            ...productData,
            images: advertImages,
            is_active: true,
          }}
        />
      </ScrollView>

      <HStack
        justifyContent="space-evenly"
        alignItems="center"
        borderWidth={1}
        borderColor="yellow.100"
        p={4}
        minH={20}
        bgColor="white"
        bottom={0}
      >
        <Button
          title="Voltar e editar"
          icon={<AntDesign name="arrowleft" size={16} color="black" />}
          bgColor="gray.500"
          textColor="gray.100"
          onPress={handleGoBack}
        />
        <Button
          title="Publicar"
          icon={<AntDesign name="tago" size={16} color="white" />}
          bgColor="blue.light"
          textColor="gray.700"
          onPress={handleOnSubmit}
        />
      </HStack>
    </View>
  );
};
