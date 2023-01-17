import { Checkbox, HStack, Text, VStack } from "native-base";
import { useState, useEffect } from "react";
interface PaymentMethodsProps {
  methods: string[];
  setMethods: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PaymentMethodCheckbox = ({
  methods,
  setMethods,
}: PaymentMethodsProps) => {
  const methodList = ["cash", "pix", "deposit", "card", "boleto"];

  function handleMethodSelector(selectedMethod: string) {
    if (methods.includes(selectedMethod))
      methods.filter((method) => method !== selectedMethod);
    else setMethods([...methods, selectedMethod]);

    setMethods(methodList);
  }

  return (
    <VStack mt={2}>
      {methodList.map((method, index) => {
        return (
          <Checkbox
            key={index + method}
            value={method}
            colorScheme="purple"
            _checked={{
              bg: "blue.light",
              borderColor: "blue.light",
              _pressed: { borderColor: "blueLight", bg: "blue" },
            }}
            onChange={() => handleMethodSelector(method)}
            accessibilityLabel={`Opção ${method}`}
          >
            {method}
          </Checkbox>
        );
      })}
    </VStack>
  );
};
