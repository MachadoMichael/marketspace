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
import { useState, useEffect } from "react";
import { Button } from "./Button";
import { PaymentMethodCheckbox } from "./PaymentMethodCheckbox";
import { PaymentMethodDTO } from "../dtos/methodDTO";
import { ItemDTO } from "../dtos/ItemDTO";

interface FilterProps {
  closeBottomSheet: () => void;
  itemList: ItemDTO[];
  setItemList: React.Dispatch<React.SetStateAction<ItemDTO[]>>;
}

export function Filter({
  closeBottomSheet,
  itemList,
  setItemList,
}: FilterProps) {
  const [isNew, setIsNew] = useState(true);
  const [canExchange, setCanExchange] = useState(false);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    PaymentMethodDTO[]
  >([
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

  const [initialItemList, setInitialItemList] = useState<ItemDTO[]>(itemList);

  useEffect(() => {
    setInitialItemList(itemList);
  }, []);

  function handleFilter() {
    const itemListCopy = [...initialItemList];

    const listAfterIsNewFilter = isNewFilter(itemListCopy);
    const listAfterCanExchangeFilter = canExchangeFilter(listAfterIsNewFilter);
    const listAfterMethodFilter = methodsFilter(listAfterCanExchangeFilter);
    setItemList(listAfterMethodFilter);
    closeBottomSheet();
  }

  function isNewFilter(itemList: ItemDTO[]) {
    const filteredItemList = itemList.filter((item) => item.isNew === isNew);
    return filteredItemList;
  }

  function canExchangeFilter(itemList: ItemDTO[]) {
    const filteredItemList = itemList.filter(
      (item) => item.canExchange === canExchange
    );
    return filteredItemList;
  }

  function methodsFilter(itemList: ItemDTO[]) {
    console.log(itemList, "<-- pré filtro metodos");
    console.log(selectedPaymentMethods, "<-- selectedPaymentMethods");
    const filteredItemList = itemList.filter((item) => {
      if (
        item.paymentMethods[0].isAccepted ===
          selectedPaymentMethods[0].isAccepted &&
        item.paymentMethods[1].isAccepted ===
          selectedPaymentMethods[1].isAccepted &&
        item.paymentMethods[2].isAccepted ===
          selectedPaymentMethods[2].isAccepted &&
        item.paymentMethods[3].isAccepted ===
          selectedPaymentMethods[3].isAccepted &&
        item.paymentMethods[4].isAccepted ===
          selectedPaymentMethods[4].isAccepted
      ) {
        console.log("BARIO");
        return item;
      }
    });
    return filteredItemList;
  }

  function resetFilters() {
    setIsNew(false);
    setCanExchange(false);

    const AllFalseMethods = [...selectedPaymentMethods];
    AllFalseMethods.forEach((method) => (method.isAccepted = false));
    setSelectedPaymentMethods(AllFalseMethods);
    setItemList(initialItemList);
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
            <TouchableOpacity onPress={closeBottomSheet}>
              <Text color="gray.300" fontSize="xl" fontFamily="heading">
                X
              </Text>
            </TouchableOpacity>
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
            onToggle={() => setCanExchange(!canExchange)}
            isChecked={canExchange}
          />

          <Text fontFamily="heading">Meios de pagamento aceitos</Text>

          <PaymentMethodCheckbox
            methods={selectedPaymentMethods}
            setMethods={setSelectedPaymentMethods}
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
}
