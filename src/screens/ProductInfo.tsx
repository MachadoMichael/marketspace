import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductDetails } from "../components/ProductDetails";
import { BottomSection } from "../components/BottomSection";
import { Button } from "../components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TopSection } from "../components/TopSection";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Box, ScrollView } from "native-base";
import { Dimensions } from "react-native";

type RouteParamsProps = {
  itemID: string;
};

export function ProductInfo() {
  const route = useRoute();
  const { goBack } = useNavigation();
  const { height } = Dimensions.get("window");
  //   const { itemID } = route.params as RouteParamsProps;
  function handleGoBack() {
    goBack();
  }

  return (
    <SafeAreaView>
      <ScrollView h={height - 100}>
        <TopSection
          leftElement={
            <TouchableOpacity onPress={handleGoBack}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          }
        />

        <ProductDetails />
      </ScrollView>

      <BottomSection>
        <Button
          isBig
          bgColor="blue.light"
          textColor="white"
          title="Entrar em contato"
          icon={<FontAwesome name="whatsapp" size={24} color="white" />}
        />
      </BottomSection>
    </SafeAreaView>
  );
}
