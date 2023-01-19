import { Pressable, Text, View } from "native-base";

interface TagProps {
  text: "NOVO" | "USADO";
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
      bgColor={text === "NOVO" ? "blue.light" : "gray.500"}
      onPress={handleFunction}
      opacity={isSelect ? 1 : 0.3}
    >
      <Text
        color={text === "NOVO" ? "white" : "gray.200"}
        fontFamily="heading"
        fontSize="xs"
      >
        {text}
      </Text>
    </Pressable>
  );
};
