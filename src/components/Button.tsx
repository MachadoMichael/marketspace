import {
  Button as NativeBaseButton,
  HStack,
  IButtonProps,
  Text,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

type ButtonProps = IButtonProps & {
  title: string;
  isBig?: boolean;
  icon?: boolean;
};

export function Button({
  title,
  icon = false,
  isBig = false,
  ...rest
}: ButtonProps) {
  return (
    <NativeBaseButton
      w={isBig ? 279 : 121}
      height={42}
      fontFamily="heading"
      flexDirection="row"
      color={"gray.100"}
      {...rest}
    >
      {icon ? <AntDesign name="tago" size={24} color="gray" /> : false}
      {title}
    </NativeBaseButton>
  );
}
