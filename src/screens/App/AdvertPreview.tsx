import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Center,
  HStack,
  ScrollView,
  Text,
  View,
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
import { useQueryClient } from "react-query";

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
      <Center h={150} bgColor="blue.light" justifyContent="flex-end">
        <Text fontFamily="heading" color="white">
          Pré-visulização do anúncio
        </Text>
        <Text color="white" mb={6}>
          É assim que seu produto vai aparecer!
        </Text>
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
        p={4}
        minH={20}
        bgColor="gray.700"
        bottom={4}
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
