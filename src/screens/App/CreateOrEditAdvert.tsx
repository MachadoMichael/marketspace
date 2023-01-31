import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  HStack,
  Image,
  Pressable,
  Radio,
  ScrollView,
  Switch,
  Text,
  VStack,
} from "native-base";
import {
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { useState } from "react";
import { PaymentMethodCheckbox } from "../../components/PaymentMethodCheckbox";
import { Button } from "../../components/Button";
import { AppStackNavigatorRouteProps } from "../../routes/app.routes";

import { TopSection } from "../../components/TopSection";
import { AdvertDTO } from "../../dtos/AdvertDTO";

import { AddPhoto } from "../../services/user/addPhoto";

import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "react-query";
import { getProduct } from "../../services/product/getProduct";
import { ProductResponseDTO } from "../../dtos/ProductResponseDTO";
import { api } from "../../services/api";

interface RouteParamsProps {
  advertID: string | null;
}

interface FormDataProps {
  name: string;
  description: string;
  price: string;
}

const NewAdvertSchema = Yup.object({
  name: Yup.string().required("Informe o título"),
  description: Yup.string()
    .required("Informe a descrição do produto")
    .max(200, "São aceitos no máximo 200 caracteres"),
  price: Yup.string().required("Informe o valor do produto"),
});

export const CreateOrEditAdvert = () => {
  const { goBack, navigate } = useNavigation<AppStackNavigatorRouteProps>();
  const { height } = Dimensions.get("window");
  const { user } = useAuth();
  const route = useRoute();
  const { advertID } = route.params as RouteParamsProps;

  const { data } = useQuery(
    "product-details",
    advertID !== null ? () => getProduct(advertID) : () => undefined,
    {
      onSuccess(data) {
        data !== undefined ? setAdvertDataFields() : false;
      },
    }
  );

  const advertForEditData: ProductResponseDTO = data?.data;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues:
      advertID === null
        ? {
            name: "",
            description: "",
            price: "",
          }
        : {
            name: advertForEditData.name,
            description: advertForEditData.description,
            price: (advertForEditData.price / 100).toString(),
          },
    resolver: yupResolver(NewAdvertSchema),
  });

  const [isNew, setIsNew] = useState("true");
  const [acceptTrade, setAccepetTrade] = useState<boolean | undefined>(
    undefined
  );
  const [advertImages, setAdvertImages] = useState<PhotoFileDTO[]>(
    [] as PhotoFileDTO[]
  );
  const [paymentMethods, setPaymentMethods] = useState<string[]>(
    [] as string[]
  );

  const setAdvertDataFields = () => {
    if (advertForEditData) {
      setAdvertImages(
        advertForEditData.product_images ? advertForEditData.product_images : []
      );
      setIsNew(advertForEditData.is_new ? "true" : "false");
      setAccepetTrade(advertForEditData.accept_trade);
      setPaymentMethods(
        advertForEditData.payment_methods.map((payment) =>
          typeof payment === "string" ? payment : payment.name
        )
      );
    }
  };

  const handleProductPhotoSelect = async () => {
    const advertPhoto: PhotoFileDTO = await AddPhoto();

    if (advertPhoto !== undefined) {
      setAdvertImages((prev) => [
        {
          name: `${user?.user.name}.${advertPhoto.extension}`,
          uri: advertPhoto.uri,
          type: advertPhoto.type,
        },
        ...prev,
      ]);
    }
  };

  const handleCreateAdvertData: SubmitHandler<FormDataProps> = ({
    name,
    description,
    price,
  }) => {
    if (advertHasImage() && advertHasPaymnetMethod()) {
      const productData: AdvertDTO = {
        name,
        description,
        is_new: isNew === "true" ? true : false,
        accept_trade: acceptTrade ? acceptTrade : false,
        price: Number(price) * 100,
        payment_methods: paymentMethods,
        product_images: advertImages,
      };

      sendAdvertPreview(productData);
    }
  };

  const sendAdvertPreview = (productData: AdvertDTO) => {
    navigate("advertpreview", {
      productData,
    });
  };

  const advertHasImage = () => {
    if (advertImages.length > 0) return true;
    else {
      Alert.alert("Por favor adcione ao menos uma imagem ao seu anúncio.");
      return false;
    }
  };

  const advertHasPaymnetMethod = () => {
    if (paymentMethods.length > 0) return true;
    else {
      Alert.alert(
        "Por favor adcione ao menos um método de pagamento ao anúncio."
      );
      return false;
    }
  };

  const removePhoto = (photoIndex: number) => {
    const newImageList = [...advertImages].filter(
      (photoURI, index) => index !== photoIndex
    );
    setAdvertImages(newImageList);
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <SafeAreaView>
      <Box
        position="fixed"
        height={height - 100}
        w="full"
        alignContent="center"
      >
        <ScrollView mb={12}>
          <TopSection
            leftElement={
              <TouchableOpacity onPress={handleGoBack}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            }
            centerElement={
              <Text fontFamily="heading" fontSize="xl" textAlign="center">
                {advertID !== null ? "Editar anúncio" : "Criar anúncio"}
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
              {advertImages.map((photoFile, index) => (
                <Box w={100} h={100} mr={4} key={index}>
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
                    onPress={() => removePhoto(index)}
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
                      uri: photoFile.uri
                        ? photoFile.uri
                        : `${api.defaults.baseURL}/images/${photoFile.path}`,
                    }}
                    alt={"product photo" + index}
                  />
                </Box>
              ))}

              {advertImages.length < 3 ? (
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

            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  w={"full"}
                  placeholder="Título do anúncio"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextArea
                  placeholder="Descrição do produto"
                  value={value}
                  w={"full"}
                  onChangeText={onChange}
                  errorMessage={errors.description?.message}
                />
              )}
            />

            <Radio.Group
              name="newOrOld"
              accessibilityLabel="new or old item?"
              value={isNew}
              onChange={setIsNew}
            >
              <HStack
                justifyContent="space-evenly"
                mb={8}
                w={"full"}
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

            <Controller
              name="price"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  w={"full"}
                  placeholder="R$"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="decimal-pad"
                  errorMessage={errors.price?.message}
                />
              )}
            />

            <Text fontFamily="heading" fontSize="md" mb={4}>
              Aceita troca?
            </Text>

            <Switch
              size="md"
              onToggle={() => setAccepetTrade((prev) => !prev)}
              isChecked={acceptTrade}
            />

            <Text fontFamily="heading" mt={4} fontSize="md">
              Meios de pagamento:
            </Text>

            <PaymentMethodCheckbox
              methods={paymentMethods}
              setMethods={setPaymentMethods}
            />
          </VStack>
        </ScrollView>
      </Box>
      <HStack
        justifyContent="space-evenly"
        alignItems="center"
        p={4}
        minH={20}
        bgColor="gray.700"
        bottom={12}
      >
        <Button
          title="Cancelar"
          bgColor="gray.500"
          textColor="gray.100"
          onPress={handleGoBack}
        />
        <Button
          title="Avançar"
          bgColor="gray.100"
          textColor="white"
          onPress={handleSubmit(handleCreateAdvertData)}
        />
      </HStack>
    </SafeAreaView>
  );
};
