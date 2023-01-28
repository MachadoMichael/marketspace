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
import { AdvertDTO } from "../../dtos/AdvertDTO";
import { AppStackNavigatorRouteProps } from "../../routes/app.routes";
import { addImages } from "../../services/product/addImages";
import { addAdvert } from "../../services/product/addAdvert";
import { useMutation, useQueryClient } from "react-query";

type RouteParamsProps = {
  productData: AdvertDTO;
  advertImages: PhotoFileDTO[];
  owner?: boolean;
};

export const AdvertPreview = () => {
  const { goBack, navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const route = useRoute();
  const { productData, owner } = route.params as RouteParamsProps;
  const queryClient = useQueryClient();

  const handleGoBack = () => {
    goBack();
  };

  const handleOnSubmit = async () => {
    const response = await addAdvert({
      ...productData,
      is_active: true,
    });
    if (response) {
      const advertID = response.data.id;

      const imagesAreAdded = await addImages(
        advertID,
        productData.product_images
      );

      queryClient.invalidateQueries("user-products");
      imagesAreAdded ? navigate("tabroutes") : false;
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
        <ImagesCarousel images={productData.product_images} />
        <ProductDetails
          advert={{
            ...productData,
            product_images: productData.product_images,
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
