import { Text, View } from "native-base";

interface TagProps {
  text: string;
  isSelect: boolean;
}

export function Tag({ text, isSelect, ...rest }: TagProps) {
  return (
    <View
      w={66}
      h={28}
      justifyContent="center"
      alignItems="center"
      rounded={9999}
      bgColor={isSelect ? "blue.light" : "gray.500"}
      {...rest}
    >
      <Text
        color={isSelect ? "white" : "gray.200"}
        fontFamily="heading"
        fontSize="xs"
      >
        {text}
      </Text>
    </View>
  );
}
