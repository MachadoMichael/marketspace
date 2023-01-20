import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { Button } from "./Button";
import { PaymentMethodsList } from "./PaymentMethodsList";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Tag } from "../components/Tag";
import { ProductDTO } from "../dtos/ProductDTO";

import { useAuth } from "../hooks/useAuth";
import { AdvertDTO } from "../dtos/AdvertDTO";
import { useState } from "react";

interface ProductDetailsProps {
  advert: AdvertDTO;
}

export const ProductDetails = ({ advert }: ProductDetailsProps) => {
  const { user } = useAuth();
  const [selectedAdvert, setSelectedAdvert] = useState<AdvertDTO>(advert);

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
            {user?.user.avatar.path ? (
              <Image
                w={8}
                h={8}
                shadow={5}
                rounded={9999}
                source={{
                  uri: user.user.avatar.path,
                }}
                alt="userAvatar"
              />
            ) : (
              <Entypo name="user" size={20} color="gray" />
            )}
          </Box>
          <Text ml={12}>{user?.user.name}</Text>
        </HStack>

        <Tag text={selectedAdvert.is_new ? "NOVO" : "USADO"} isSelect={true} />

        <HStack justifyContent="space-between" mt={2} mb={2}>
          <Text fontFamily="heading" fontSize="xl">
            {selectedAdvert.name}
          </Text>
          <Text fontFamily="heading" fontSize="lg" color="blue.light">
            R$
            <Text fontFamily="heading" fontSize="xl" color="blue.light">
              {selectedAdvert.price / 100}
            </Text>
          </Text>
        </HStack>

        <Text>{selectedAdvert.description}</Text>

        <Text fontFamily="heading" mt={4}>
          Aceita troca?
          <Text fontFamily="body">
            {selectedAdvert.accept_trade ? " Sim" : " Não"}
          </Text>
        </Text>

        <Text fontFamily="heading" mt={4}>
          Meios de pagamento:
        </Text>

        <PaymentMethodsList methodsList={selectedAdvert.payment_methods} />
      </VStack>
    </Box>
  );
};
