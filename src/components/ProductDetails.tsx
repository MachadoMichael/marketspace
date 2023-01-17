import { Box, Center, HStack, ScrollView, Text, VStack } from "native-base";
import { Button } from "./Button";
import { PaymentMethodsList } from "./PaymentMethodsList";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Tag } from "../components/Tag";

export const ProductDetails = () => {
  return (
    <Box>
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
          Aceita troca? <Text fontFamily="body">Sim</Text>
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
    </Box>
  );
};
