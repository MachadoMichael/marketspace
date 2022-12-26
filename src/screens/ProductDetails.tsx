import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Tag } from "../components/Tag";
import { PaymentMethodsList } from "../components/PaymentMethodsList";
import { Button } from "../components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";

type RouteParamsProps = {
  itemID: string;
};

export function ProductDetails() {
  const route = useRoute();
  const { goBack } = useNavigation();
  //   const { itemID } = route.params as RouteParamsProps;

  function handleGoBack() {
    goBack();
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <HStack
          h={12}
          alignItems="center"
          justifyContent="space-between"
          ml={6}
          mr={6}
        >
          <Pressable onPress={handleGoBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>
        </HStack>

        <View>
          <Image
            w={375}
            h={280}
            source={{
              uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            }}
            alt="selected product details"
          />
        </View>

        <VStack m={6}>
          <HStack alignItems="center" mb={6}>
            <Box
              position="absolute"
              left={0}
              w={8}
              h={8}
              bgColor="gray.100"
              borderColor={"gray.300"}
              borderWidth={1}
              justifyContent="center"
              alignItems="center"
              rounded={9999}
            >
              {
                //   item.user ? (
                //     <Image
                //       w={8}
                //       h={8}
                //       shadow={5}
                //       rounded={9999}
                //       source={{
                //         uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
                //       }}
                //       alt="userAvatar"
                //     />
                //   ) :
                <Entypo name="user" size={20} color="gray" />
              }
            </Box>
            <Text ml={12}>User Name</Text>
          </HStack>

          <Tag text="NOVO" isSelect={true} />

          <HStack justifyContent="space-between" mt={2} mb={2}>
            <Text fontFamily="heading" fontSize="xl">
              Item.name
            </Text>
            <Text fontFamily="heading" fontSize="lg" color="blue.light">
              R$
              <Text fontFamily="heading" fontSize="xl" color="blue.light">
                120,00
              </Text>
            </Text>
          </HStack>

          <Text>
            ITEM DESCRIPTION - ITEM DESCRIPTION - ITEM DESCRIPTION - ITEM
            DESCRIPTION ITEM DESCRIPTION - ITEM DESCRIPTION - ITEM DESCRIPTION -
            ITEM DESCRIPTION ITEM DESCRIPTION - ITEM DESCRIPTION - ITEM
            DESCRIPTION - ITEM DESCRIPTION ITEM DESCRIPTION - ITEM DESCRIPTION -
          </Text>

          <Text fontFamily="heading" mt={4}>
            Aceita troca? <Text>Sim</Text>
          </Text>

          <Text fontFamily="heading" mt={4}>
            Meios de pagamento:
          </Text>

          <PaymentMethodsList
            methodsList={[
              "Boleto",
              "Dinheiro",
              "Pix",
              "Cartão de crédito",
              "Depósito bancário",
            ]}
          />
        </VStack>

        <Center mt={4} mb={12}>
          <Button
            isBig
            bgColor="blue.light"
            textColor="white"
            title="Entrar em contato"
            icon={<FontAwesome name="whatsapp" size={24} color="white" />}
          />
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
}
