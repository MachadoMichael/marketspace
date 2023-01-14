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

import { Button } from "../components/Button";
import { ImagesCarousel } from "../components/ImagesCarousel";
import { ProductDetails } from "../components/ProductDetails";
import { AppStackNavigatorRouteProps } from "../routes/app.routes";

interface RouteParamsProps {
  itemID: string;
}

export function AdPreview() {
  const { goBack, navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const route = useRoute();
  const { itemID } = route.params as RouteParamsProps;
  function handleGoBack() {
    goBack();
  }

  function handleGoToUserAdDetails() {
    navigate("addetails", { itemID });
  }

  return (
    <View flex={1}>
      <Center h={100} bgColor="blue.light">
        <Text fontFamily="heading" color="white">
          Pré-visulização do anúncio
        </Text>
        <Text color="white">É assim que seu produto vai aparecer!</Text>
      </Center>

      <ScrollView>
        <ImagesCarousel
          imagesURI={[
            "https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/McLaren-620R-Media-Drives_174-V1-e1605830876110.jpg",
            "https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/McLaren-620R-Media-Drives_106-V1.jpg?resize=1536,1024",
            "https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/McLaren-620R-Media-Drives_170-e1605799605454.jpg?quality=70&strip=info",
            "https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/McLaren-620R-Media-Drives_04.jpg?resize=1536,1024",
            "https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/McLaren-620R-Media-Drives_03.jpg?quality=70&strip=info&w=650",
          ]}
          isActiveAd
        />
        <ProductDetails />
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
          title="Cancelar"
          bgColor="gray.500"
          textColor="gray.100"
          onPress={handleGoBack}
        />
        <Button
          title="Avançar"
          bgColor="gray.100"
          textColor="white"
          onPress={handleGoToUserAdDetails}
        />
      </HStack>
    </View>
  );
}
