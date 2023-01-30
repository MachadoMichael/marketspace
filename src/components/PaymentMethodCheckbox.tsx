import { Checkbox, VStack, IStackProps } from "native-base";
import { LogBox } from "react-native";
interface PaymentMethodsProps extends IStackProps {
  methods: string[];
  setMethods: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PaymentMethodCheckbox = ({
  methods,
  setMethods,
}: PaymentMethodsProps) => {
  const methodList = ["cash", "pix", "deposit", "card", "boleto"];

  LogBox.ignoreLogs([
    "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
  ]);

  return (
    <VStack mt={2}>
      <Checkbox.Group value={methods} onChange={setMethods}>
        {methodList.map((method, index) => {
          return (
            <Checkbox
              defaultIsChecked
              key={index + method}
              value={method}
              colorScheme="purple"
              _checked={{
                bg: "blue.light",
                borderColor: "blue.light",
                _pressed: { borderColor: "blueLight", bg: "blue" },
              }}
              accessibilityLabel={`Opção ${method}`}
            >
              {method}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    </VStack>
  );
};
