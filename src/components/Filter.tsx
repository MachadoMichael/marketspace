import { HStack, ScrollView, Switch, Text, VStack } from "native-base";
import { Tag } from "./Tag";
import { useState } from "react";
import { Button } from "./Button";
import { PaymentMethodCheckbox } from "./PaymentMethodCheckbox";

import { Dimensions, Pressable } from "react-native";
import { FilterParamsProps } from "../services/product/fetchProducts";

interface FilterProps {
  closeBottomSheet: () => void;
  params: FilterParamsProps;
  setParams: React.Dispatch<React.SetStateAction<FilterParamsProps>>;
}

export const Filter = ({
  closeBottomSheet,
  params,
  setParams,
}: FilterProps) => {
  const { width } = Dimensions.get("window");
  const [is_new, setIs_new] = useState(true);
  const [accept_trade, setAccept_trade] = useState(false);
  const [payment_methods, setPayment_methods] = useState<string[]>(
    [] as string[]
  );

  const handleFilter = () => {
    setParams({ ...params, is_new, accept_trade, payment_methods });
    closeBottomSheet();
  };

  const resetFilters = () => {
    setIs_new(false);
    setAccept_trade(false);
    setPayment_methods([]);
    setParams({});
    closeBottomSheet();
  };

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
              isSelect={is_new}
              handleFunction={() => setIs_new(!is_new)}
            />
            <Tag
              text="USADO"
              isSelect={!is_new}
              handleFunction={() => setIs_new(!is_new)}
            />
          </HStack>

          <Text fontFamily="heading" mb={2}>
            Aceita troca?
          </Text>

          <Switch
            mb={4}
            size="md"
            onToggle={() => setAccept_trade((prev) => !prev)}
            isChecked={accept_trade}
            onTrackColor="blue.light"
            offTrackColor="gray.500"
          />

          <Text fontFamily="heading">Meios de pagamento aceitos</Text>

          <PaymentMethodCheckbox
            methods={payment_methods}
            setMethods={setPayment_methods}
          />
        </VStack>
        <HStack
          justifyContent="space-between"
          mt={12}
          mb={10}
          position="fixed"
        >
          <Button
            title="Resetar filtros"
            bgColor="gray.600"
            onPress={resetFilters}
            w={width/2.5}
          />
          <Button
            title="Aplicar filtros"
            bgColor="gray.200"
            textColor="white"
            onPress={handleFilter}
            w={width/2.5}
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
};
