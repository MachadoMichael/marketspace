import { Checkbox, HStack, Text, VStack } from "native-base";
import { useState, useEffect } from "react";
import { PaymentMethodDTO } from "../dtos/MethodDTO";
interface PaymentMethodsProps {
  methods: PaymentMethodDTO[];
  setMethods: React.Dispatch<React.SetStateAction<PaymentMethodDTO[]>>;
}

export function PaymentMethodCheckbox({
  methods,
  setMethods,
}: PaymentMethodsProps) {
  function handleChangeIsAccepetedMethod(index: number) {
    const methodsList = [...methods];
    methodsList[index].isAccepted = !methodsList[index].isAccepted;
    setMethods(methodsList);
  }

  return (
    <VStack mt={2}>
      {methods
        ? methods.map((method, index) => {
            return (
              <Checkbox
                key={index + method.name}
                value={method.name}
                colorScheme="purple"
                isChecked={method.isAccepted}
                onChange={() => handleChangeIsAccepetedMethod(index)}
              >
                {method.name}
              </Checkbox>
            );
          })
        : false}
    </VStack>
  );
}
