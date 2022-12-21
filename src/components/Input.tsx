import {
  Center,
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  Box,
  HStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

type InputProps = IInputProps & {
  errorMessage?: string | null;
  icon?: boolean;
};

export function Input({
  errorMessage = null,
  isInvalid,
  icon = false,
  ...rest
}: InputProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <HStack
        w={279}
        h={45}
        bgColor="gray.700"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        rounded={6}
      >
        <NativeBaseInput
          flex={1}
          w={219}
          h={44}
          bgColor="gray.700"
          placeholderTextColor="gray.400"
          fontSize="md"
          borderWidth={0}
          borderColor="transparent"
          _focus={{
            borderColor: "gray.100",
            borderWidth: 1,
          }}
          isInvalid={invalid}
          _invalid={{
            borderWidth: 1,
            borderColor: "red.500",
          }}
          {...rest}
        ></NativeBaseInput>
        {icon ? (
          <Box p={2}>
            <AntDesign name="eyeo" size={24} color="gray" />
          </Box>
        ) : (
          false
        )}
        <FormControl.ErrorMessage _text={{ color: "red.500" }}>
          {errorMessage}
        </FormControl.ErrorMessage>
      </HStack>
    </FormControl>
  );
}
