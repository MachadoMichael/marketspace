import { Box, HStack, Image, Text, View, VStack } from "native-base";
import { Button } from "../components/Button";
import { Ionicons } from "@expo/vector-icons";

export function HomeHeader() {
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
        bgColor="gray.100"
        textColor="gray.500"
        icon={<Ionicons name="add" size={24} color="gray" />}
      />
    </HStack>
  );
}