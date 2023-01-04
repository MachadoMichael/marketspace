import { Checkbox, HStack, Text, VStack } from "native-base";
import { useState, useEffect } from "react";
interface PaymentMethodsProps {
  acceptedMethods: string[];
  setAcceptedMethods: React.Dispatch<React.SetStateAction<string[]>>;
}

export function PaymentMethodCheckbox({
  acceptedMethods,
  setAcceptedMethods,
}: PaymentMethodsProps) {
  const [billingSlip, setBillingSlip] = useState("");
  const [cash, setCash] = useState("");
  const [pix, setPix] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [bankDeposit, setBankDeposit] = useState("");

  console.log(acceptedMethods, "<- teste");
  return (
    <VStack mt={2}>
      <Checkbox.Group
        onChange={setAcceptedMethods}
        value={acceptedMethods}
        accessibilityLabel="choose numbers"
      >
        <Checkbox value={"Boleto"} colorScheme="purple">
          Boleto
        </Checkbox>
        <Checkbox value={"Dinheiro"} colorScheme="purple">
          Dinheiro
        </Checkbox>
        <Checkbox value={"Pix"} colorScheme="purple">
          Pix
        </Checkbox>
        <Checkbox value={"Cartão de crédito"} colorScheme="purple">
          Cartão de crédito
        </Checkbox>
        <Checkbox value={"Depósito bancário"} colorScheme="purple">
          Depósito bancário
        </Checkbox>
      </Checkbox.Group>
    </VStack>
  );
}
