import { Box, Image, Pressable, Text, View, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { ItemDTO } from "../dtos/ItemDTO";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigatorRouteProps } from "../routes/app.routes";

interface ItemCardProps {
  item: ItemDTO;
  isUserAd?: boolean;
}

export function ItemCard({ item, isUserAd = false }: ItemCardProps) {
  const { navigate } = useNavigation<AppStackNavigatorRouteProps>();

  function handleGoToAdvertDetails(itemID: string) {
    navigate("addetails", { itemID });
  }

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
        bgColor={item.isNew ? "blue.light" : "gray.300"}
        justifyContent="center"
        alignItems="center"
        rounded={9999}
      >
        <Text fontFamily="heading" color="white" fontSize="xs">
          {item.isNew ? "NOVO" : "USADO"}
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
        {item.user ? (
          <Image
            w={8}
            h={8}
            shadow={5}
            rounded={9999}
            source={{
              uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
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
          uri: item.uri[0],
        }}
        alt="imagem do produto"
      />

      <VStack pl={2}>
        <Text fontFamily="body" color="gray.300">
          {item.name}
        </Text>
        <Text fontFamily="heading" fontSize={"md"} color="gray.100">
          R$ {item.value}
        </Text>
      </VStack>
    </Pressable>
  );
}
