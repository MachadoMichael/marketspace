import {
  Box,
  Center,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import SvgLogo from "../components/SvgLogo";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRouteProps } from "../routes/auth.routes";
import { useState } from "react";
import { Alert } from "react-native";
import { AddPhoto } from "../services/addPhoto";
import { addNewUser } from "../storage/addNewUser";

export function SignUp() {
  const { goBack } = useNavigation<AuthNavigatorRouteProps>();
  const [avatar, setAvatar] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  function handleBackToSignIn() {
    goBack();
  }

  function addAvatar() {
    AddPhoto(avatar, setAvatar, "userAvatar");
  }

  async function handleCreateNewUser() {
    fieldsAreFilled() &&
    samePasswords() &&
    validEmail(email) &&
    avatarIsSelected()
      ? await addNewUser({
          avatar: avatar[0],
          name,
          email,
          tel: phone,
          password,
        })
      : Alert.alert("Por favor verifique os campos");
  }

  function avatarIsSelected() {
    if (avatar.length === 1) return true;
    else return false;
  }

  function fieldsAreFilled() {
    const fields = [name, email, phone, password, confirmPassword];
    const emptyFields = fields.filter((field) => field === "");

    if (emptyFields.length === 0) return true;
    else return false;
  }

  function validEmail(email: string) {
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
  }

  function samePasswords() {
    if (password === confirmPassword) return true;
    else return false;
  }

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
          {avatar.length > 0 ? (
            <Image
              w="full"
              h="full"
              rounded={9999}
              source={{
                uri: avatar[0],
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
            onPress={addAvatar}
          >
            <Center>
              <Feather name="edit-3" size={20} color="white" />
            </Center>
          </Pressable>
        </Center>

        <Center>
          <Input placeholder="Nome" value={name} onChangeText={setName} />
          <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
          <Input placeholder="Telefone" value={phone} onChangeText={setPhone} />
          <Input
            placeholder="Senha"
            rightElement={
              <Pressable w={10} onPress={() => setHidePassword(!hidePassword)}>
                <AntDesign name="eyeo" size={24} color="gray" />
              </Pressable>
            }
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={setPassword}
          />
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Button
            title="Criar"
            isBig
            bgColor={"gray.200"}
            textColor="white"
            onPress={handleCreateNewUser}
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
}
