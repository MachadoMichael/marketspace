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
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodDTO[]>([
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

  function filteringItemList() {
    const itemListCopy = [...itemList];
    let filteredItemList = itemListCopy.filter((item) => item.isNew === isNew);
    // console.log(filteredItemList, "<- FILTRO ISNEW");

    filteredItemList = filteredItemList.filter(
      (item) => item.canExchange === canExchange
    );
    // console.log(filteredItemList, "<- FILTRO CANEXCHANGE");

    setItemList(filteredItemList);
  }

  function resetFilters() {
    setIsNew(false);
    setCanExchange(false);

    const AllFalseMethods = [...paymentMethods];
    AllFalseMethods.forEach((method) => (method.isAccepted = false));
    setPaymentMethods(AllFalseMethods);
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
            methods={paymentMethods}
            setMethods={setPaymentMethods}
          />
        </VStack>
        <HStack
          justifyContent="space-between"
          w={10}
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
            onPress={filteringItemList}
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
}
