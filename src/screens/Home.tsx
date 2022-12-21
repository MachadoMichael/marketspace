import { Center, View, VStack } from "native-base";
import { ItemCard } from "../components/ItemCard";
import { useState } from "react";
import { ItemDTO } from "../dtos/ItemDTO";

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
    <View flex={1} bgColor="brown">
      <Center m={10}>
        <ItemCard item={items[0]} />
      </Center>
    </View>
  );
}
