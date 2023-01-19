import { Center, Image, Pressable, ScrollView, Text } from "native-base";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import SvgLogo from "../../components/SvgLogo";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRouteProps } from "../../routes/auth.routes";
import { useState } from "react";
import { Alert } from "react-native";
import { AddPhoto } from "../../services/addPhoto";
import { addUser } from "../../services/user/addUser";
import { PhotoFileDTO } from "../../dtos/PhotoFileDTO";
import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppTabNavigatorRouteProps } from "../../routes/app.routes";
import { useAuth } from "../../hooks/useAuth";
interface FormDataProps {
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirm: string;
}

const SignUpSchema = Yup.object({
  name: Yup.string().required("Informe o nome."),
  email: Yup.string().required("Informe o email").email("E-mail inválido"),
  tel: Yup.string().required("Informe o telefone"),
  password: Yup.string()
    .required("Informe o password")
    .min(6, "A senha deve conter ao menos 6 dígitos"),
  password_confirm: Yup.string()
    .required("Confirme a senha")
    .oneOf([Yup.ref("password"), null], "A confirmação de senha não confere"),
});

export const SignUp = () => {
  const { goBack } = useNavigation<AuthNavigatorRouteProps>();
  const [userAvatar, setUserAvatar] = useState<PhotoFileDTO>(
    {} as PhotoFileDTO
  );

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const { navigate } = useNavigation<AppTabNavigatorRouteProps>();
  const {} = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      password: "",
      password_confirm: "",
    },
    resolver: yupResolver(SignUpSchema),
  });

  const handleAddUserAvatar = async () => {
    try {
      const avatar = await AddPhoto();
      if (avatar.uri) setUserAvatar(avatar);
    } catch (error) {}
  };

  function handleBackToSignIn() {
    goBack();
  }

  const handleOnSubmit: SubmitHandler<FormDataProps> = async ({
    name,
    email,
    tel,
    password,
  }) => {
    userAvatar.uri !== ""
      ? await addUser({
          userAvatar,
          name,
          email,
          password,
          tel,
        })
      : Alert.alert("Por favor adcione uma imagem ao seu avatar.");
  };

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
          {userAvatar.uri ? (
            <Image
              w="full"
              h="full"
              rounded={9999}
              source={{
                uri: userAvatar.uri,
              }}
              alt={"user photo"}
            />
          ) : (
            <Entypo name="user" size={48} color="gray" />
          )}
          <Pressable
            justifyContent={"center"}
            position={"absolute"}
            width={10}
            height={10}
            left={12}
            top={12}
            bgColor="blue.light"
            rounded={"full"}
            onPress={handleAddUserAvatar}
          >
            <Center>
              <Feather name="edit-3" size={20} color="white" />
            </Center>
          </Pressable>
        </Center>

        <Center>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                value={value.toString()}
                onChangeText={onChange}
                keyboardType="number-pad"
                errorMessage={errors.tel?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                rightElement={
                  <Pressable
                    w={10}
                    onPress={() => setHidePassword(!hidePassword)}
                  >
                    <AntDesign name="eyeo" size={24} color="gray" />
                  </Pressable>
                }
                secureTextEntry={hidePassword}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                rightElement={
                  <Pressable
                    w={10}
                    onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                  >
                    <AntDesign name="eyeo" size={24} color="gray" />
                  </Pressable>
                }
                secureTextEntry={hideConfirmPassword}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar"
            isBig
            bgColor={"gray.200"}
            textColor="white"
            onPress={handleSubmit(handleOnSubmit)}
          />
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
          mb={12}
          onPress={handleBackToSignIn}
        />
      </Center>
    </ScrollView>
  );
};
