import { Box, HStack, Image, Text, View, VStack } from "native-base";
import { Button } from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigatorRouteProps, AppTabNavigatorRouteProps } from "../routes/app.routes";

export function HomeHeader() {
  const {navigate} = useNavigation<AppStackNavigatorRouteProps>()
  
  function handleGoToCreateAdvert(){
    navigate('createnewadvert')
  }
  return (
    <HStack w={327} justifyContent="space-between" mt={4}>
      <HStack>
        <Box
          rounded="full"
          w={45}
          h={45}
          borderColor="blue.basic"
          borderWidth={2}
        >
          <Image
            w={10}
            h={10}
            shadow={5}
            rounded={9999}
            source={{
              uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            }}
            alt="userAvatar"
          />
        </Box>

        <VStack ml={2}>
          <Text fontSize="md">Boas vindas,</Text>
          <Text fontSize="md" fontFamily="heading">
            Maria!
          </Text>
        </VStack>
      </HStack>

      <Button
        title="Criar anúncio"
        bgColor="gray.200"
        textColor="white"
        icon={<Ionicons name="add" size={24} color="white" />}
        onPress={handleGoToCreateAdvert}
      />
    </HStack>
  );
}
