import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  Radio,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { AppNavigatorRouteProps } from "../routes/app.routes";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";
import { useState } from "react";

export function CreateNewAdvert() {
  const [radioSelected, setRadioSelected] = useState("");
  const { goBack } = useNavigation<AppNavigatorRouteProps>();

  function handleGoBackUserAdverts() {
    goBack();
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Center p={8}>
          <HStack alignItems="center">
            <Text fontFamily="heading" fontSize="xl">
              Criar anúncio
            </Text>
            <View position="absolute" left={-90}>
              <TouchableOpacity onPress={handleGoBackUserAdverts}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </HStack>
        </Center>

        <VStack ml={6} mr={6}>
          <Text fontFamily="heading" fontSize="md">
            Imagens
          </Text>
          <Text>
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <HStack mt={4} mb={8}>
            <View
              w={100}
              h={100}
              bgColor="gray.500"
              rounded={6}
              justifyContent="center"
              alignItems="center"
            >
              <AntDesign name="plus" size={24} color="gray" />
            </View>
          </HStack>

          <Text fontFamily="heading" fontSize="md">
            Sobre o produto
          </Text>

          <Input w={327} placeholder="Título do anúncio" />
          <TextArea />

          <Radio.Group
            name="newOrOld"
            accessibilityLabel="new or old item?"
            value={radioSelected}
            onChange={setRadioSelected}
          >
            <HStack
              justifyContent="space-between"
              mb={8}
              w={327}
              alignItems="center"
            >
              <Radio value={"true"} mb={2}>
                Produto Novo
              </Radio>
              <Radio value={"false"} mb={2}>
                Produto usado
              </Radio>
            </HStack>
          </Radio.Group>

          <Text fontFamily="heading" fontSize="md">
            Venda
          </Text>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
