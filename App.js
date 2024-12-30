import React from "react";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider, useTheme } from "./theme/ThemeProvider"; // Your theme provider
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import AddToCartScreen from "./screens/AddToCart"; // Import AddToCartScreen
import { CartProvider } from './context/CartContext'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Exo-Regular": require("./assets/fonts/Exo-Regular.ttf"),
    "Exo-Medium": require("./assets/fonts/Exo-Medium.ttf"),
    "Exo-SemiBold": require("./assets/fonts/Exo-SemiBold.ttf"),
    "Exo-Light": require("./assets/fonts/Exo-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <CartProvider> {/* Wrap the app with CartProvider */}
      <ThemeProvider>
        <ThemedNavigation />
      </ThemeProvider>
    </CartProvider>
  );
}

function ThemedNavigation() {
  const { theme } = useTheme(); // Access the theme

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary, // Set the header background color
          },
          headerTintColor: theme.colors.buttonText, // Set the header text color
          headerTitleStyle: {
            fontFamily: "Exo-Medium", // Apply custom font if needed
          },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="AddToCart"
          component={AddToCartScreen} // Add AddToCartScreen to the stack
          options={{ title: "Cart" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}