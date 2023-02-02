import { useNavigation, useRoute } from "@react-navigation/native";
import { Center, HStack, ScrollView, Text, useToast, View } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { ImagesCarousel } from "../../components/ImagesCarousel";
import { ProductDetails } from "../../components/ProductDetails";
import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import { AdvertDTO } from "../../dtos/AdvertDTO";
import {
  AppStackNavigatorRouteProps,
  AppTabNavigatorRouteProps,
} from "../../routes/app.routes";
import { addImages } from "../../services/product/addImages";
import { addAdvert } from "../../services/product/addAdvert";
import { useQueryClient } from "react-query";
import { putProduct } from "../../services/product/putProduct";
import { removeImage } from "../../services/product/removeImage";

type RouteParamsProps = {
  productData: AdvertDTO;
  advertImages: PhotoFileDTO[];
  advertID: string | null;
};

export const AdvertPreview = () => {
  const { goBack, navigate } = useNavigation<AppTabNavigatorRouteProps>();
  const route = useRoute();
  const { productData, advertID } = route.params as RouteParamsProps;
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleGoBack = () => {
    goBack();
  };

  const handleOnSubmit = () => {
    advertID === null ? createNewAdvert() : editOldAdvert();
  };

  const createNewAdvert = async () => {
    let title;
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

      title = "Anúncio criado com sucesso.";
      queryClient.invalidateQueries("user-products");
      imagesAreAdded ? navigate("useradverts") : false;
    } else {
      title = "Não foi possível criar o anúncio";
    }

    toast.show({
      title,
      placement: "top",
      bgColor: "green.500",
    });
  };

  const editOldAdvert = async () => {
    let title;

    if (advertID !== null) {
      const response = await putProduct({
        id: advertID,
        name: productData.name,
        description: productData.description,
        is_new: productData.is_new,
        accept_trade: productData.accept_trade,
        payment_methods: productData.payment_methods as string[],
        price: productData.price,
        images: productData.product_images,
      });

      if (response) {
        title = "Anúncio editado com sucesso.";

        await addImages(advertID, productData.product_images);
        queryClient.invalidateQueries("user-products");
        navigate("useradverts");
      }
    } else {
      title = "Não foi possível editar o anúncio";
    }

    toast.show({
      title: title,
      placement: "top",
      bgColor: "green.500",
    });
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
