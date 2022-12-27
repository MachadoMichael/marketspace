import { Checkbox, HStack, Text, VStack } from "native-base";

interface PaymentMethodsProps {
  methodsCheckbox: string[];
}

export function PaymentMethodCheckbox({ methodsCheckbox }: PaymentMethodsProps) {
  return (
    <VStack mt={2}>
      {methodsCheckbox.map((method) => {
        return (
          <Checkbox value={method} colorScheme="purple">
            {method}
          </Checkbox>
        );
      })}
    </VStack>
  );
}
