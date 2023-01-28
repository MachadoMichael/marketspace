import { Box, Image, Pressable, Text, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { AdvertDTO } from "../dtos/AdvertDTO";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigatorRouteProps } from "../routes/app.routes";

import { api } from "../services/api";
import { ProductResponseDTO } from "../dtos/ProductResponseDTO";
import { useAuth } from "../hooks/useAuth";

interface ItemCardProps {
  item: ProductResponseDTO;
  isUserAd?: boolean;
}

export const ItemCard = ({ item, isUserAd = false }: ItemCardProps) => {
  const { navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const { user } = useAuth();

  const handleGoToAdvertDetails = (itemID: string) => {
    navigate("addetails", { advertID: item.id, owner: true });
  };

  return (
    <Pressable
      h={144}
      w={150}
      rounded={4}
      mb={4}
      onPress={() => handleGoToAdvertDetails(item.id)}
    >
      <Box
        position="absolute"
        right={0}
        m={1}
        w={50}
        h={17}
        bgColor={item.is_new ? "blue.light" : "gray.300"}
        justifyContent="center"
        alignItems="center"
        rounded={9999}
      >
        <Text fontFamily="heading" color="white" fontSize="xs">
          {item.is_new ? "NOVO" : "USADO"}
        </Text>
      </Box>
      <Box
        position="absolute"
        left={0}
        m={1}
        w={8}
        h={8}
        bgColor="gray.100"
        borderColor={"gray.300"}
        borderWidth={1}
        justifyContent="center"
        alignItems="center"
        rounded={9999}
      >
        {item.user_id ? (
          <Image
            w={8}
            h={8}
            shadow={5}
            rounded={9999}
            source={{
              uri: user?.user.avatar
                ? `${api.defaults.baseURL}/images/${user?.user.avatar}`
                : "11",
            }}
            alt="userAvatar"
          />
        ) : (
          <Entypo name="user" size={20} color="gray" />
        )}
      </Box>

      <Image
        p={4}
        w={150}
        h={100}
        zIndex={-1}
        resizeMode="contain"
        rounded={4}
        source={{
          uri: item.product_images
            ? `${api.defaults.baseURL}/images/${item.product_images[0].path}`
            : "fail",
        }}
        alt="imagem do produto"
      />

      <VStack pl={2}>
        <Text fontFamily="body" color="gray.300">
          {item.name}
        </Text>
        <Text fontFamily="heading" fontSize={"md"} color="gray.100">
          R$ {item.price / 100}
        </Text>
      </VStack>
    </Pressable>
  );
};
