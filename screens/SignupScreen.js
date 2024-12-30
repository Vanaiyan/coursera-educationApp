import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";
import { typography } from "../theme/typography";
import Icon from "react-native-vector-icons/Ionicons"; // Import the Icon

const SignUpScreen = () => {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = () => {
    console.log("Sign Up Successful");
    navigation.navigate("Login");
  };

  const isFormValid =
    name.trim() &&
    validateEmail(email) &&
    validatePassword(password);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Image
        source={require("../assets/images/signup.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        style={[styles.title, typography.title, { color: theme.colors.title }]}
      >
        Create an Account
      </Text>

      {/* Name Field */}
      <Text
        style={[
          styles.subtitle,
          typography.body,
          {
            color: theme.colors.title,
            alignSelf: "flex-start", // Align the text to the left within its container
            marginLeft: 20, // Optional: Add some padding from the left edge
          },
        ]}
      >
        Name
      </Text>
      <TextInput
        style={[
          styles.input,
          typography.input,
          {
            backgroundColor: theme.colors.inputBackground,
            color: theme.colors.text // Set the text color to white
          },
        ]}
        placeholder="Enter your Name"
        placeholderTextColor={theme.colors.placeholder}
        value={name}
        onChangeText={setName}
      />

      {/* Email Field */}
      <Text
        style={[
          styles.subtitle,
          typography.body,
          {
            color: theme.colors.title,
            alignSelf: "flex-start",
            marginLeft: 20, // Keep consistent spacing
          },
        ]}
      >
        Email
      </Text>
      <TextInput
        style={[
          styles.input,
          typography.input,
          {
            backgroundColor: theme.colors.inputBackground,
            color: theme.colors.text
          },
        ]}
        placeholder="Enter your Email"
        placeholderTextColor={theme.colors.placeholder}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors({ ...errors, email: validateEmail(text) ? "" : "Invalid email format" });
        }}
        keyboardType="email-address"
      />
      {errors.email ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.email}
        </Text>
      ) : null}

      {/* Password Field */}
      <Text
        style={[
          styles.subtitle,
          typography.body,
          {
            color: theme.colors.title,
            alignSelf: "flex-start",
            marginLeft: 20,
          },
        ]}
      >
        Password
      </Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.input,
            typography.input,
            {
              flex: 1,
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
            },
          ]}
          placeholder="Create a Password"
          placeholderTextColor={theme.colors.placeholder}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({
              ...errors,
              password: validatePassword(text)
                ? ""
                : "Password must be 8-12 characters, include 1 letter and 1 number",
            });
          }}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.iconContainer}
        >
          <Icon
            name={passwordVisible ? "eye-off" : "eye"} // Toggle between icons
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      {errors.password ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.password}
        </Text>
      ) : null}

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isFormValid
              ? theme.colors.primary
              : theme.colors.disabled,
          },
        ]}
        disabled={!isFormValid}
        onPress={handleSignUp}
      >
        <Text
          style={[
            styles.buttonText,
            typography.smallText,
            { color: theme.colors.buttonText },
          ]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      {/* Link to Login */}
      <Text
        style={[
          styles.footerText,
          typography.smallText,
          { color: theme.colors.subtitle },
        ]}
      >
        Already have an account?{" "}
        <Text
          style={[
            styles.linkText,
            typography.smallText,
            { color: theme.colors.primary },
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          Log In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  image: {
    width: 300,
    height: 220,
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 25,
  },
  subtitle: {
    textAlign: "left",
    marginBottom: 10,
  },
  input: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    width: "90%",
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
  },
  footerText: {
    textAlign: "center",
  },
  linkText: {
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  toggleButton: {
    marginLeft: 10,
  },
});

export default SignUpScreen;