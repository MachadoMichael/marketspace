import { Checkbox, HStack, Text, VStack } from "native-base";

interface PaymentMethodsProps {
  methodsCheckbox: string[];
}

export function PaymentMethodCheckbox({
  methodsCheckbox,
}: PaymentMethodsProps) {
  return (
    <VStack mt={2}>
      {methodsCheckbox.map((method, index) => {
        return (
          <Checkbox value={method} colorScheme="purple" key={index}>
            {method}
          </Checkbox>
        );
      })}
    </VStack>
  );
}
