import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import the hook
import { useTheme } from "../theme/ThemeProvider";

const WelcomeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation(); // Access the navigation prop via the hook

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Image */}
      <Image
        source={require("../assets/images/WelcomeScreen.png")}
        style={styles.image}
        resizeMode="contain"
      />
      {/* Title */}
      <Text style={[styles.title, { color: theme.colors.title }]}>
        Explore your new skills today
      </Text>
      {/* Subtitle */}
      <Text style={[styles.subtitle, { color: theme.colors.subtitle }]}>
        You can learn various kinds of courses in your hand
      </Text>
      {/* Sign In Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate("Login")} // Navigate to Login screen
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 280,
    height: 280,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Exo-Medium",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    width: "80%",
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Exo-Medium",
    fontSize: 16,
  },
});

export default WelcomeScreen;