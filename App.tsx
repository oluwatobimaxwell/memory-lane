import { StyleSheet, useColorScheme } from "react-native";
import HomeStack from "./src/navigation/HomeStack";
import { NavigationContainer } from "@react-navigation/native";
// @ts-ignore
import { ThemeProvider } from "styled-components/native";
import { ThemeContext } from "./src/theme/themContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TabStack from "./src/navigation/TabStack";
import Toast, { ToastConfig, BaseToast } from "react-native-toast-message";
import hexToRgba from "hex-to-rgba";

const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  theme: "light",
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#ffffff",
  },
};

const darkTheme = {
  background: "#000000",
  text: "#ffffff",
  theme: "dark",
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#1d1d1d",
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60,
    },
  },
});

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const containerStyle = {
    paddingHorizontal: 15,
    backgroundColor: hexToRgba(theme.background, 0.95),
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  };

  const text1Style = {
    fontSize: 15,
    color: theme.text,
  };

  const text2Style = {
    fontSize: 12,
    color: theme.text,
  };

  const toastConfig: ToastConfig = {
    success: ({ text1, text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: "green" }}
        contentContainerStyle={containerStyle}
        text1Style={text1Style}
        text2Style={text2Style}
        text1={text1}
        text2={text2}
      />
    ),
    error: ({ text1, text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: "red" }}
        contentContainerStyle={containerStyle}
        text1Style={text1Style}
        text2Style={text2Style}
        text1={text1}
        text2={text2}
      />
    ),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={theme}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <TabStack />
            <Toast config={toastConfig} />
          </NavigationContainer>
        </ThemeProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
