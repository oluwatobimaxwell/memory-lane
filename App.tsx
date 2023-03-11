import { StyleSheet, useColorScheme } from "react-native";
import HomeStack from "./src/navigation/HomeStack";
import { NavigationContainer } from "@react-navigation/native";
// @ts-ignore
import { ThemeProvider } from "styled-components/native";
import { ThemeContext } from "./src/theme/themContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


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

const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeContext.Provider value={theme}>
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <HomeStack />
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
