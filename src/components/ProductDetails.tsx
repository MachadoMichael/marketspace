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

import { useAuth } from "../hooks/useAuth";
import { AdvertDTO } from "../dtos/AdvertDTO";
import { useState } from "react";
import { api } from "../services/api";

interface UserData {
  avatar: string;
  name: string;
  tel: string;
}

interface AdvertResponse extends AdvertDTO {
  user?: UserData;
}
interface ProductDetailsProps {
  advert: AdvertResponse;
}

export const ProductDetails = ({ advert }: ProductDetailsProps) => {
  const { user } = useAuth();

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
            {advert.user?.avatar !== undefined || user?.user.avatar ? (
              <Image
                w={8}
                h={8}
                shadow={5}
                rounded={9999}
                source={{
                  uri: advert?.user
                    ? `${api.defaults.baseURL}/images/${advert?.user?.avatar}`
                    : `${api.defaults.baseURL}/images/${user?.user.avatar}`,
                }}
                alt="userAvatar"
              />
            ) : (
              <Entypo name="user" size={20} color="gray" />
            )}
          </Box>
          <Text ml={12}>
            {advert.user?.name ? advert.user.name : user?.user.name}
          </Text>
        </HStack>

        <Tag text={advert.is_new ? "NOVO" : "USADO"} isSelect={true} />

        <HStack justifyContent="space-between" mt={2} mb={2}>
          <Text fontFamily="heading" fontSize="xl">
            {advert.name}
          </Text>
          <Text fontFamily="heading" fontSize="lg" color="blue.light">
            R$
            <Text fontFamily="heading" fontSize="xl" color="blue.light">
              {advert.price / 100}
            </Text>
          </Text>
        </HStack>

        <Text>{advert.description}</Text>

        <Text fontFamily="heading" mt={4}>
          Aceita troca?
          <Text fontFamily="body">{advert.accept_trade ? " Sim" : " Não"}</Text>
        </Text>

        <Text fontFamily="heading" mt={4}>
          Meios de pagamento:
        </Text>

        <PaymentMethodsList methodsList={advert.payment_methods} />
      </VStack>
    </Box>
  );
};
