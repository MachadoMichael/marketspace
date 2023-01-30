import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductDetails } from "../../components/ProductDetails";
import { Button } from "../../components/Button";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TopSection } from "../../components/TopSection";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { HStack, ScrollView, Text, VStack } from "native-base";
import { Dimensions } from "react-native";

import { ImagesCarousel } from "../../components/ImagesCarousel";

import { AppStackNavigatorRouteProps } from "../../routes/app.routes";
import { getProduct } from "../../services/product/getProduct";
import { Loading } from "../../components/Loading";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteProduct } from "../../services/product/deleteProduct";
import { patchProduct } from "../../services/product/patchProduct";
import { useAuth } from "../../hooks/useAuth";
import { OpenURLButton } from "../../components/OpenURLButton";

interface RouteParamsProps {
  advertID: string;
  owner: boolean;
}

export const AdvertDetails = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const { height } = Dimensions.get("window");
  const queryClient = useQueryClient();

  const { advertID } = route.params as RouteParamsProps;

  const { data } = useQuery("product-details", () => getProduct(advertID));
  const advertData = data?.data;

  const { isLoading, mutate } = useMutation(() => deleteProduct(advertID), {
    onSuccess: () => {
      queryClient.invalidateQueries("user-products");
      navigate("tabroutes");
    },
  });

  console.log(advertData?.user?.tel, "Data product details");

  const handleGoBack = () => {
    goBack();
  };

  const handleEnableOrDisableAdvert = async () => {
    await patchProduct(advertID, !advertData.is_active);
    queryClient.invalidateQueries("product-details");
    queryClient.invalidateQueries("user-products");
  };

  const sellerPhoneNumber: string = advertData?.user?.tel;
  const supportedURL = `https://wa.me/${sellerPhoneNumber}`;
  const handleContactSeller = () => {};

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

          {advertData ? (
            <>
              <ImagesCarousel
                images={advertData.product_images}
                isActiveAd={advertData.is_active}
              />
              <ProductDetails advert={advertData} />
            </>
          ) : (
            <Loading />
          )}
        </VStack>
      </ScrollView>

      {advertData?.user_id === user?.user.id ? (
        <VStack
          bgColor="gray.600"
          w="full"
          h={32}
          justifyContent="space-around"
          alignItems="center"
          bottom={24}
          p={4}
        >
          <Button
            icon={<AntDesign name="poweroff" size={16} color="white" />}
            title={
              advertData?.is_active ? "Desativar anúncio" : "Ativar anúncio"
            }
            bgColor={advertData?.is_active ? "blue.light" : "gray.200"}
            textColor="white"
            onPress={handleEnableOrDisableAdvert}
            w={327}
          />

          <Button
            icon={<Feather name="trash" size={16} color="black" />}
            title="Excluir anúncio"
            bgColor="gray.500"
            textColor="gray.100"
            onPress={() => mutate()}
            w={327}
          />
        </VStack>
      ) : (
        <HStack
          bgColor="gray.600"
          w="full"
          h={32}
          justifyContent="space-evenly"
          alignItems="center"
          bottom={24}
          p={4}
        >
          <HStack>
            <Text color="blue.basic" fontFamily={"heading"}>
              R$
            </Text>
            <Text color="blue.basic" fontFamily={"heading"} fontSize={24}>
              {advertData?.price / 100}
            </Text>
          </HStack>

          <OpenURLButton url={supportedURL} />
        </HStack>
      )}
    </SafeAreaView>
  );
};
