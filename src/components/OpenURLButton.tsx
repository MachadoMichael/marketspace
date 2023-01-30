import { useCallback } from "react";
import { Alert, Linking } from "react-native";
import { Button } from "./Button";
import { FontAwesome } from "@expo/vector-icons";

interface OpenURLButtonProps {
  url: string;
}

export const OpenURLButton = ({ url }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <Button
      bgColor="blue.light"
      textColor="white"
      title="Entrar em contato"
      icon={<FontAwesome name="whatsapp" size={24} color="white" />}
      onPress={handlePress}
    />
  );
};
