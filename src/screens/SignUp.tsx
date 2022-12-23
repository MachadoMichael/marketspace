import { Box, Center, ScrollView, Text, View, VStack } from "native-base";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import SvgLogo from "../components/SvgLogo";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export function SignUp() {
  return (
    <ScrollView flex={1} bgColor="gray.600">
      <Center m={10}>
        <SvgLogo width={60} height={40} />
        <Text fontFamily="heading" fontSize="lg">
          Boas vindas!
        </Text>
        <Text width={290} textAlign="center" color="gray.300">
          Crie sua conta e use o espaço para comprar itens variados e vender
          seus produtos
        </Text>
      </Center>

      <Center mb={8}>
        <Center
          width={88}
          height={88}
          rounded="full"
          bgColor={"gray.500"}
          borderWidth={3}
          borderColor="blue.light"
          mb={4}
        >
          <Entypo name="user" size={48} color="gray" />
          <View
            justifyContent={"center"}
            position={"absolute"}
            width={10}
            height={10}
            left={12}
            top={12}
            bgColor="blue.light"
            rounded={"full"}
          >
            <Center>
              <Feather name="edit-3" size={20} color="white" />
            </Center>
          </View>
        </Center>

        <Center>
          <Input placeholder="Nome" />
          <Input placeholder="E-mail" />
          <Input placeholder="Telefone" />
          <Input
            placeholder="Senha"
            icon={
              <Box w={10}>
                <AntDesign name="eyeo" size={24} color="gray" />
              </Box>
            }
            secureTextEntry
          />
          <Input
            placeholder="Confirmar senha"
            icon={
              <Box w={10}>
                <AntDesign name="eyeo" size={24} color="gray" />
              </Box>
            }
            secureTextEntry
          />
          <Button title="Criar" isBig bgColor={"gray.200"} />
        </Center>
      </Center>

      <Center>
        <Text color="gray.300" mb={4}>
          Já tem uma conta?
        </Text>
        <Button
          title="Ir para o login"
          isBig
          bgColor="gray.500"
          _text={{ color: "gray.100" }}
          mb={12}
        />
      </Center>
    </ScrollView>
  );
}
