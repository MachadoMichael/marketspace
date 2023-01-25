import { HStack, Text, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { PaymentMethodsDTO } from "../dtos/PaymentMethodsDTO";

interface PaymentMethodsProps {
  methodsList: PaymentMethodsDTO[] | string[];
}

export const PaymentMethodsList = ({ methodsList }: PaymentMethodsProps) => {
  const selectIcon = (method: string) => {
    switch (method) {
      case "boleto":
        return <Ionicons name="ios-barcode-outline" size={24} color="black" />;
      case "pix":
        return <MaterialIcons name="qr-code" size={24} color="black" />;
      case "cash":
        return <MaterialCommunityIcons name="cash" size={24} color="black" />;
      case "card":
        return <FontAwesome name="credit-card" size={24} color="black" />;
      case "deposit":
        return <FontAwesome name="bank" size={24} color="black" />;
      default:
        break;
    }
  };

  return (
    <VStack mt={2}>
      {methodsList
        ? methodsList.map((method, index) => {
            const icon = selectIcon(
              typeof method === "string" ? method : method.key
            );
            return (
              <HStack
                mb={1}
                mt={1}
                key={`methodList, choice method${method}` + index}
              >
                {icon}
                <Text ml={2}>
                  {typeof method === "string" ? method : method.name}
                </Text>
              </HStack>
            );
          })
        : false}
    </VStack>
  );
};
