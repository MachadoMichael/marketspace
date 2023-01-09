import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Radio,
  ScrollView,
  Switch,
  Text,
  View,
  VStack,
} from "native-base";
import {
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";
import { useState } from "react";
import { PaymentMethodCheckbox } from "../components/PaymentMethodCheckbox";
import { Button } from "../components/Button";
import { AppStackNavigatorRouteProps } from "../routes/app.routes";

import { TopSection } from "../components/TopSection";
import { ItemDTO } from "../dtos/ItemDTO";
import { PaymentMethodDTO } from "../dtos/methodDTO";
import { v4 as uuid } from "uuid";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { color } from "react-native-reanimated";

interface RouteParamsProps {
  itemID: string | null;
}

export function AdForm() {
  const { goBack, navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const { height } = Dimensions.get("window");

  const RandomID = uuid();
  const route = useRoute();
  const { itemID } = route.params as RouteParamsProps;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isNew, setIsNew] = useState("true");
  const [price, setPrice] = useState("");
  const [canExchange, setCanExchange] = useState(false);
  const [adPhotos, setAdPhotos] = useState<string[]>([]);
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
  const [newAd, setNewAd] = useState<ItemDTO>({
    name: title,
    canExchange: canExchange,
    id: RandomID,
    isNew: isNew == "true" ? true : false,
    value: price,
    uri: ["adsasd", "adssadas"],
    paymentMethods: methods,
  });

  async function handleProductPhotoSelect() {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (selectedPhoto.canceled) {
        return;
      }

      const photoIsValidated = await checkingPhotoSize(
        selectedPhoto.assets[0].uri
      );

      if (photoIsValidated) {
        const newPhotoURI = selectedPhoto.assets[0].uri;
        const prevStateAdPhotos = [...adPhotos];
        prevStateAdPhotos.push(newPhotoURI);
        setAdPhotos(prevStateAdPhotos);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function checkingPhotoSize(selectedPhotoURI: string) {
    const photoInfo = await FileSystem.getInfoAsync(selectedPhotoURI);
    if (photoInfo.size) {
      const photoSizeInMb = photoInfo.size / 1024 / 1024;

      if (photoSizeInMb < 5) {
        return true;
      } else {
        Alert.alert(
          "A imagem selecionada é muito grande, por favor selecione uma imagem menor do que 5MB"
        );
        return false;
      }
    } else {
      return false;
    }
  }

  function handleCreateNewAd() {
    //gerar produto e enviar iD
    handleGoToAdPreview();
  }

  function handleGoToAdPreview() {
    if (itemID !== null) {
      navigate("adpreview", { itemID: itemID });
    } else {
      navigate("adpreview", { itemID: newAd.id });
    }
  }

  function deletePhoto(photoIndex: number) {
    const newAdPhotoList = [...adPhotos].filter(
      (photoURI, index) => index !== photoIndex
    );
    setAdPhotos(newAdPhotoList);
  }

  function handleGoBackUserAd() {
    goBack();
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
              {adPhotos.map((photoUri, index) => (
                <Box w={100} h={100} mr={4}>
                  <Pressable
                    position="absolute"
                    zIndex={1}
                    m={1}
                    right={0}
                    bgColor="gray.200"
                    rounded={9999}
                    w={4}
                    h={4}
                    justifyContent="center"
                    alignItems="center"
                    onPress={() => deletePhoto(index)}
                  >
                    <Text color="white" fontSize="xs">
                      X
                    </Text>
                  </Pressable>
                  <Image
                    w="full"
                    h="full"
                    rounded={6}
                    source={{
                      uri: photoUri,
                    }}
                    alt={"adPhoto" + index}
                  />
                </Box>
              ))}

              {adPhotos.length < 3 ? (
                <Pressable
                  w={100}
                  h={100}
                  bgColor="gray.500"
                  rounded={6}
                  justifyContent="center"
                  alignItems="center"
                  onPress={handleProductPhotoSelect}
                >
                  <AntDesign name="plus" size={24} color="gray" />
                </Pressable>
              ) : (
                false
              )}
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
