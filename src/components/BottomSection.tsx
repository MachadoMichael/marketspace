import { HStack } from "native-base";
import React from "react";

interface BottomSectionProps {
  children: React.ReactNode;
}

export function BottomSection({ children }: BottomSectionProps) {
  return (
    <HStack
      justifyContent="space-evenly"
      alignItems="center"
      borderWidth={1}
      borderColor="yellow.100"
      p={4}
      minH={20}
      bgColor="white"
      bottom={12}
    >
      {children}
    </HStack>
  );
}
