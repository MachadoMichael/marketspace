import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  Radio,
  ScrollView,
  Switch,
  Text,
  View,
  VStack,
} from "native-base";
import { SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";
import { useState } from "react";
import { PaymentMethodCheckbox } from "../components/PaymentMethodCheckbox";
import { Button } from "../components/Button";
import { AppStackNavigatorRouteProps } from "../routes/app.routes";
import { BottomSection } from "../components/BottomSection";
import { TopSection } from "../components/TopSection";
import { ItemDTO } from "../dtos/ItemDTO";
import { PaymentMethodDTO } from "../dtos/methodDTO";

interface RouteParamsProps {
  itemID: string | null;
}

export function AdForm() {
  const { goBack, navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const { height } = Dimensions.get("window");

  const route = useRoute();
  const { itemID } = route.params as RouteParamsProps;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isNew, setIsNew] = useState("true");
  const [price, setPrice] = useState("");
  const [canExchange, setCanExchange] = useState(false);
  const [methods, setMethods] = useState<PaymentMethodDTO[]>([
    {
      name: "Boleto",
      isAccepted: false,
    },
    {
      name: "Dinheiro",
      isAccepted: false,
    },
    {
      name: "Pix",
      isAccepted: false,
    },
    {
      name: "Cartão de crédito",
      isAccepted: false,
    },
    {
      name: "Depósito bancário",
      isAccepted: false,
    },
  ]);

  function handleCreateNewAd() {
    handleGoToAdPreview();
    //gerar produto e enviar iD
  }

  function handleGoBackUserAd() {
    goBack();
  }

  function handleGoToAdPreview() {
    navigate("adpreview");
  }

  return (
    <SafeAreaView>
      <Box position="fixed" height={height - 100}>
        <ScrollView>
          <TopSection
            leftElement={
              <TouchableOpacity onPress={handleGoBackUserAd}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            }
            centerElement={
              <Text fontFamily="heading" fontSize="xl" textAlign="center">
                {itemID !== null ? "Editar anúncio" : "Criar anúncio"}
              </Text>
            }
          />

          <VStack ml={6} mr={6} mb={6}>
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

            <Text fontFamily="heading" fontSize="md" mb={4}>
              Sobre o produto
            </Text>

            <Input
              w={327}
              placeholder="Título do anúncio"
              value={title}
              onChangeText={setTitle}
            />

            <TextArea value={description} setValue={setDescription} />

            <Radio.Group
              name="newOrOld"
              accessibilityLabel="new or old item?"
              value={isNew}
              onChange={setIsNew}
            >
              <HStack
                justifyContent="space-between"
                mb={8}
                w={327}
                alignItems="center"
              >
                <Radio value="true" mb={2}>
                  Produto Novo
                </Radio>
                <Radio value="false" mb={2}>
                  Produto usado
                </Radio>
              </HStack>
            </Radio.Group>

            <Text fontFamily="heading" fontSize="md" mb={4}>
              Venda
            </Text>

            <Input
              w={327}
              placeholder="R$"
              value={price}
              onChangeText={setPrice}
            />

            <Text fontFamily="heading" fontSize="md" mb={4}>
              Aceita troca?
            </Text>

            <Switch
              size="md"
              onToggle={() => setCanExchange(!canExchange)}
              isChecked={canExchange}
            />

            <Text fontFamily="heading" mt={4} fontSize="md">
              Meios de pagamento:
            </Text>

            <PaymentMethodCheckbox methods={methods} setMethods={setMethods} />
          </VStack>
        </ScrollView>
      </Box>
      <HStack
        justifyContent="space-evenly"
        alignItems="center"
        borderWidth={1}
        borderColor="yellow.100"
        p={4}
        minH={20}
        bgColor="white"
        bottom={0}
      >
        <Button title="Cancelar" bgColor="gray.500" textColor="gray.100" />
        <Button
          title="Avançar"
          bgColor="gray.100"
          textColor="white"
          onPress={handleCreateNewAd}
        />
      </HStack>
    </SafeAreaView>
  );
}
