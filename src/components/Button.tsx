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

export const Button = ({
  title,
  icon,
  isBig = false,
  textColor = "gray.100",
  ...rest
}: ButtonProps) => {
  return (
    <NativeBaseButton
      w={isBig ? 279 : 170}
      height={42}
      fontFamily="heading"
      {...rest}
    >
      <HStack justifyContent="space-between" alignItems="center">
        {icon}
        <Text color={textColor} fontFamily="heading" ml={2}>
          {title}
        </Text>
      </HStack>
    </NativeBaseButton>
  );
};
