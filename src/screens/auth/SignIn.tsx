import { useNavigation } from "@react-navigation/native";
import { Box, Center, Text, View, Pressable } from "native-base";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import SvgLogo from "../../components/SvgLogo";
import { AuthNavigatorRouteProps } from "../../routes/auth.routes";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { userLogin } from "../../services/user/userLogin";
import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { background } from "native-base/lib/typescript/theme/styled-system";

interface FormDataProps {
  email: string;
  password: string;
}

const signInSchema = Yup.object({
  email: Yup.string().required("Informe o email").email("E-mail inválido"),
  password: Yup.string()
    .required("Informe o password")
    .min(6, "A senha deve conter no minimo 6 dígitos"),
});

export const SignIn = () => {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>();
  const { signIn } = useContext(AuthContext);
  const [hidePassword, setHidePassword] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn: SubmitHandler<FormDataProps> = async ({
    email,
    password,
  }) => {
    await signIn(email, password);
  };

  function handleNewAccount() {
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
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
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
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Enter"
            isBig
            bgColor="blue.light"
            onPress={handleSubmit(handleSignIn)}
            _pressed={{
              backgroundColor: "blue",
            }}
          />
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
          onPress={handleNewAccount}
        />
      </Center>
    </View>
  );
};
