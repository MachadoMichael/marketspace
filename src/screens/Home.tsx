import { Box, Center, HStack, Text, VStack } from "native-base";
import { ItemCard } from "../components/ItemCard";
import { useState } from "react";
import { ItemDTO } from "../dtos/ItemDTO";
import { SafeAreaView } from "react-native";
import { HomeHeader } from "../components/HomeHeader";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Input } from "../components/Input";

export function Home() {
  const [items, setItems] = useState<ItemDTO[]>([
    {
      name: "Tênis",
      value: "59,90",
      new: true,
      uri: "https://static.dafiti.com.br/p/Evoltenn-T%C3%AAnis-Evoltenn-Easy-Style-Preto-Amarelo-1382-3414617-1-zoom.jpg",
      user: "CarlosAfafa",
    },
  ]);
  return (
    <SafeAreaView>
      <Center>
        <HomeHeader />

        <VStack mt={4} justifyContent="center">
          <Text color="gray.300">Seus produtos anunciados para venda</Text>
          <HStack
            w={327}
            h={66}
            rounded={6}
            bgColor="gray.500"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <HStack alignItems="center">
              <AntDesign name="tago" size={24} color="black" />
              <VStack ml={2}>
                <Text fontSize="lg" fontFamily="heading">
                  4
                </Text>
                <Text fontSize="xs">anúncios ativos</Text>
              </VStack>
            </HStack>

            <HStack>
              <Text fontSize="xs" fontFamily="heading" color="blue.basic">
                Meus anúncios
              </Text>
              <AntDesign name="arrowright" size={18} color="black" />
            </HStack>
          </HStack>
        </VStack>

        <VStack w={327} mt={8}>
          <Text>Compre produtos variados</Text>
          <Input
            placeholder="Buscar anúncio"
            w={327}
            InputRightElement={
              <HStack w={20}>
                <Feather name="search" size={24} color="black" />
                <Text ml={2} mr={2}>
                  |
                </Text>
                <Octicons name="filter" size={24} color="black" />
              </HStack>
            }
          />
        </VStack>

        <Center m={10}>
          <ItemCard item={items[0]} />
        </Center>
      </Center>
    </SafeAreaView>
  );
}
