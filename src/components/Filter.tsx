import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { HStack, ScrollView, Switch, Text, View, VStack } from "native-base";
import { Tag } from "./Tag";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import { PaymentMethodCheckbox } from "./PaymentMethodCheckbox";

import { ProductDTO } from "../dtos/AdvertDTO";
import { Pressable } from "react-native";

interface FilterProps {
  closeBottomSheet: () => void;
  advertList: ProductDTO[];
  setAdvertList: React.Dispatch<React.SetStateAction<ProductDTO[]>>;
}

export const Filter = ({
  closeBottomSheet,
  advertList,
  setAdvertList,
}: FilterProps) => {
  const [isNew, setIsNew] = useState(true);
  const [canExchange, setCanExchange] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

  const [initialItemList, setInitialItemList] = useState<ProductDTO[]>(
    [] as ProductDTO[]
  );

  useEffect(() => {
    setInitialItemList(advertList);
  }, []);

  function handleFilter() {
    const itemListCopy = [...initialItemList];

    const listAfterIsNewFilter = isNewFilter(itemListCopy);
    const listAfterCanExchangeFilter = canExchangeFilter(listAfterIsNewFilter);
    const listAfterMethodFilter = methodsFilter(listAfterCanExchangeFilter);
    setAdvertList(listAfterMethodFilter);
    closeBottomSheet();
  }

  function isNewFilter(itemList: ProductDTO[]) {
    const filteredItemList = itemList.filter((item) => item.is_new === isNew);
    return filteredItemList;
  }

  function canExchangeFilter(itemList: ProductDTO[]) {
    const filteredItemList = itemList.filter(
      (item) => item.accept_trade === canExchange
    );
    return filteredItemList;
  }

  function methodsFilter(itemList: ProductDTO[]) {
    const filteredItemList = itemList.filter((item) => {});
    return filteredItemList;
  }

  function resetFilters() {
    setIsNew(false);
    setCanExchange(false);
    setPaymentMethods([]);
    setAdvertList(initialItemList);
  }

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
            <Pressable onPress={closeBottomSheet}>
              <Text color="gray.300" fontSize="xl" fontFamily="heading">
                X
              </Text>
            </Pressable>
          </HStack>

          <Text fontFamily="heading" mb={2}>
            Condição
          </Text>
          <HStack w={140} mb={4} justifyContent="space-between">
            <Tag
              text="NOVO"
              isSelect={isNew}
              handleFunction={() => setIsNew(!isNew)}
            />
            <Tag
              text="USADO"
              isSelect={!isNew}
              handleFunction={() => setIsNew(!isNew)}
            />
          </HStack>

          <Text fontFamily="heading" mb={2}>
            Aceita troca?
          </Text>

          <Switch
            mb={4}
            size="md"
            onToggle={() => setCanExchange((prev) => !prev)}
            isChecked={canExchange}
            onTrackColor="blue.light"
            offTrackColor="gray.500"
          />

          <Text fontFamily="heading">Meios de pagamento aceitos</Text>

          <PaymentMethodCheckbox
            methods={paymentMethods}
            setMethods={setPaymentMethods}
          />
        </VStack>
        <HStack
          justifyContent="space-between"
          mt={12}
          mb={10}
          bottom={0}
          position="fixed"
        >
          <Button
            title="Resetar filtros"
            bgColor="gray.600"
            onPress={resetFilters}
          />
          <Button
            title="Aplicar filtros"
            bgColor="gray.200"
            textColor="white"
            onPress={handleFilter}
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
};
