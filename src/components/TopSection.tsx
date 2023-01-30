import { Box, HStack } from "native-base";
import React from "react";
import { Dimensions } from "react-native";

interface TopSectionProps {
  leftElement?: JSX.Element;
  centerElement?: JSX.Element;
  rightElement?: JSX.Element;
}

export const TopSection = ({
  leftElement,
  centerElement,
  rightElement,
}: TopSectionProps) => {
  const { width } = Dimensions.get("window");
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      w={width}
      h={16}
      pl={6}
      pr={6}
      top={0}
    >
      <Box w="1/5" alignItems="flex-start">
        {leftElement}
      </Box>
      <Box w="3/5" alignItems="center">
        {centerElement}
      </Box>
      <Box w="1/5" alignItems="flex-end">
        {rightElement}
      </Box>
    </HStack>
  );
};
