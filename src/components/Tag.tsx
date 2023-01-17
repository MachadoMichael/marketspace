import { Pressable, Text, View } from "native-base";

interface TagProps {
  text: string;
  isSelect: boolean;
  handleFunction?: () => void;
}

export const Tag = ({ text, isSelect, handleFunction }: TagProps) => {
  return (
    <Pressable
      w={66}
      h={28}
      justifyContent="center"
      alignItems="center"
      rounded={9999}
      bgColor={isSelect ? "blue.light" : "gray.500"}
      onPress={handleFunction}
    >
      <Text
        color={isSelect ? "white" : "gray.200"}
        fontFamily="heading"
        fontSize="xs"
      >
        {text}
      </Text>
    </Pressable>
  );
};
