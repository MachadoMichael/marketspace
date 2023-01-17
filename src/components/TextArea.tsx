import {
  Box,
  TextArea as NativeTextArea,
  ITextAreaProps,
  FormControl,
  View,
} from "native-base";

type TextAreaProps = ITextAreaProps & {
  errorMessage?: string | null;
};

export const TextArea = ({
  errorMessage = null,
  isInvalid,
  ...rest
}: TextAreaProps) => {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeTextArea
        autoCompleteType={View}
        w={327}
        h={160}
        placeholder="Descrição"
        bgColor="gray.700"
        rounded={6}
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
      />
      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
