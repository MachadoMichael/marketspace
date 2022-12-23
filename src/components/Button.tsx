import {
  Button as NativeBaseButton,
  HStack,
  IButtonProps,
  Text,
} from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
  isBig?: boolean;
  icon?: JSX.Element;
  textColor?: string;
};

export function Button({
  title,
  icon,
  isBig = false,
  textColor = "gray.100",
  ...rest
}: ButtonProps) {
  return (
    <NativeBaseButton
      w={isBig ? 279 : 140}
      height={42}
      fontFamily="heading"
      {...rest}
    >
      <HStack justifyContent="space-between">
        {icon}
        <Text color={textColor}> {title}</Text>
      </HStack>
    </NativeBaseButton>
  );
}
