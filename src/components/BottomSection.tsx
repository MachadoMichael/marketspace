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
      h={20}
      bgColor="white"
      position="fixed"
      bottom={0}
    >
      {children}
    </HStack>
  );
}
