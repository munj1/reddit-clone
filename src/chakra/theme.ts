import { extendTheme } from "@chakra-ui/react";
import "@fontsource/noto-sans-kr/300.css";
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/700.css";
import { Button } from "./button";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3c00", //reddit color
    },
  },
  fonts: {
    body: `'Noto Sans KR', sans-serif`,
    // heading: `'Noto Sans KR', sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    Button,
  },
});
