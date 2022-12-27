import { useNavigation } from "@react-navigation/native";
import { Box, Center, Text, View } from "native-base";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import SvgLogo from "../components/SvgLogo";
import { AuthNavigatorRouteProps } from "../routes/auth.routes";
import { AntDesign } from "@expo/vector-icons";

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>();
  function handleGoToCreateAccount() {
    navigate("signUp");
  }

  return (
    <View flex={1} bgColor="gray.700">
      <Center flex={0.75} bgColor="gray.600" roundedBottom={24}>
        <Center mb={16}>
          <SvgLogo />
          <Text fontFamily="heading" fontSize="3xl" color="gray.100">
            marketspace
          </Text>
          <Text color="gray.300" mt={-2}>
            Seu espaço de compra e venda
          </Text>
        </Center>

        <Text mb={4}>Acesse sua conta</Text>
        <Center>
          <Input placeholder="user" />
          <Input
            placeholder="password"
            rightElement={
              <Box w={10}>
                <AntDesign name="eyeo" size={24} color="gray" />
              </Box>
            }
            secureTextEntry
          />
          <Button title="Enter" isBig bgColor="blue.light" />
        </Center>
      </Center>

      <Center flex={0.25}>
        <Text color="gray.200" mb={4}>
          Ainda não tem acesso ?
        </Text>
        <Button
          title="Criar uma conta"
          isBig
          bgColor="gray.500"
          color="gray.100"
          onPress={handleGoToCreateAccount}
        />
      </Center>
    </View>
  );
}
