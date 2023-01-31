import { Box, Image, Pressable, Text, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigatorRouteProps } from "../routes/app.routes";

import { api } from "../services/api";
import { ProductResponseDTO } from "../dtos/ProductResponseDTO";
import { Loading } from "./Loading";

interface ProductCardProps extends ProductResponseDTO {
  user?: { avatar: string };
}

interface ItemCardProps {
  product: ProductCardProps;
  isUserAdvert?: boolean;
}

export const ProductCard = ({
  product,
  isUserAdvert = false,
}: ItemCardProps) => {
  const { navigate } = useNavigation<AppStackNavigatorRouteProps>();

  const handleGoToAdvertDetails = (productID: string) => {
    navigate("addetails", { advertID: product.id });
  };

  return (
    <Pressable
      h={144}
      w={150}
      rounded={4}
      mb={4}
      onPress={() => handleGoToAdvertDetails(product.id)}
    >
      <Box
        position="absolute"
        right={0}
        m={1}
        w={50}
        h={17}
        bgColor={product.is_new ? "blue.light" : "gray.300"}
        justifyContent="center"
        alignItems="center"
        rounded={9999}
        zIndex={1}
      >
        <Text fontFamily="heading" color="white" fontSize="xs">
          {product.is_new ? "NOVO" : "USADO"}
        </Text>
      </Box>
      <Box
        position="absolute"
        left={0}
        m={1}
        w={8}
        h={8}
        justifyContent="center"
        alignItems="center"
        rounded={9999}
        zIndex={1}
      >
        {!isUserAdvert ? (
          product.user && product.user !== undefined ? (
            <Image
              w={8}
              h={8}
              shadow={5}
              borderColor={"gray.700"}
              borderWidth={1}
              rounded={9999}
              source={{
                uri: `${api.defaults.baseURL}/images/${product.user?.avatar}`,
              }}
              alt="userAvatar"
            />
          ) : (
            <Entypo name="user" size={20} color="gray" />
          )
        ) : (
          false
        )}
      </Box>

      <Box>
        {product.is_active || product.is_active === undefined ? (
          <></>
        ) : (
          <Box
            w="full"
            h="full"
            position="absolute"
            bgColor="gray.100"
            opacity={0.9}
            zIndex={1}
            justifyContent="center"
            alignItems="center"
            rounded={4}
          >
            <Text color="gray.500" fontFamily="heading">
              ANÚNCIO DESATIVADO
            </Text>
          </Box>
        )}

        {product ? (
          <Image
            p={4}
            w={150}
            h={100}
            zIndex={-1}
            resizeMode="cover"
            rounded={4}
            source={{
              uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
            }}
            alt="imagem do produto"
          />
        ) : (
          <Loading />
        )}
      </Box>

      <VStack pl={2}>
        <Text fontFamily="body" color="gray.300">
          {product.name}
        </Text>
        <Text fontFamily="heading" fontSize={"md"} color="gray.100">
          R$ {product.price / 100}
        </Text>
      </VStack>
    </Pressable>
  );
};
