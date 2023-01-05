import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native";
import { BottomSection } from "../components/BottomSection";
import { Button } from "../components/Button";
import { ImagesCarousel } from "../components/ImagesCarousel";
import { ProductDetails } from "../components/ProductDetails";
import { AppStackNavigatorRouteProps } from "../routes/app.routes";

export function UserAdDetails() {
  const { goBack } = useNavigation<AppStackNavigatorRouteProps>();
  function handleGoBack() {
    goBack();
  }
  return (
    <SafeAreaView>
      <View>
        <ScrollView>
          <ImagesCarousel
            data={[
              "https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/McLaren-620R-Media-Drives_174-V1-e1605830876110.jpg",
              "https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/McLaren-620R-Media-Drives_106-V1.jpg?resize=1536,1024",
              "https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/McLaren-620R-Media-Drives_170-e1605799605454.jpg?quality=70&strip=info",
              "https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/McLaren-620R-Media-Drives_04.jpg?resize=1536,1024",
              "https://quatrorodas.abril.com.br/wp-content/uploads/2020/11/McLaren-620R-Media-Drives_03.jpg?quality=70&strip=info&w=650",
            ]}
          />
          <ProductDetails />

          <VStack
            justifyContent="space-evenly"
            alignItems="center"
            borderWidth={1}
            borderColor="yellow.100"
            p={4}
            bgColor="red"
            bottom={0}
          >
            <Button
              isBig
              title="Desativar anúncio"
              bgColor="gray.200"
              textColor="white"
              onPress={null}
            />

            <Button
              isBig
              title="Excluir anúncio"
              bgColor="gray.500"
              textColor="gray.100"
              onPress={handleGoBack}
            />
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
