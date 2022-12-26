import { TouchableOpacity } from "@gorhom/bottom-sheet";
import {
  Center,
  Checkbox,
  HStack,
  ScrollView,
  Select,
  Switch,
  Text,
  View,
  VStack,
} from "native-base";
import { Tag } from "./Tag";
import { useState } from "react";
import { Button } from "./Button";

interface FilterProps {
  closeBottomSheet: () => void;
}

export function Filter({ closeBottomSheet }: FilterProps) {
  const [checkboxGroup] = useState([
    "Boleto",
    "Pix",
    "Dinheiro",
    "Cartão de crédito",
    "Depósito bancário",
  ]);

  return (
    <ScrollView>
      <VStack
        w="full"
        h="full"
        bottom={0}
        roundedTop={24}
        pl={8}
        pr={8}
        justifyContent="space-between"
      >
        <VStack>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontFamily="heading" fontSize="lg">
              Filtrar anúncios
            </Text>
            <TouchableOpacity onPress={closeBottomSheet}>
              <Text color="gray.300" fontSize="xl" fontFamily="heading">
                X
              </Text>
            </TouchableOpacity>
          </HStack>

          <Text fontFamily="heading">Condição</Text>
          <HStack mb={4}>
            <Tag text="NOVO" isSelect />
            <Tag text="USADO" isSelect={false} />
          </HStack>

          <Text fontFamily="heading">Aceita troca?</Text>
          <Switch onTrackColor="blue.light" mb={4} />

          <Text fontFamily="heading">Meios de pagamento aceitos</Text>

          {checkboxGroup.map((component) => (
            <Checkbox value={component} colorScheme="purple">
              {component}
            </Checkbox>
          ))}
        </VStack>
        <HStack justifyContent="space-between" mt={12} mb={4}>
          <Button title="Resetar filtros" bgColor="gray.600" />
          <Button
            title="Aplicar filtros"
            bgColor="gray.200"
            textColor="white"
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
}
