import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    blue: {
      light: "#647AC7",
      basic: "#364D9D",
      lowOpacity: "#647AC720",
    },
    red: {
      light: "#EE7979",
    },
    gray: {
      100: "#1A181B",
      200: "#3E3A40",
      300: "#5F5B62",
      400: "#9F9BA1",
      500: "#D9D8DA",
      600: "#EDECEE",
      700: "#F7F7F8",
    },
  },
  fonts: {
    body: "Karla_400Regular",
    heading: "Karla_700Bold",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
});
