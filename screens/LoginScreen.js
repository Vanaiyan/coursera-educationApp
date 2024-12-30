import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import the hook
import { useTheme } from "../theme/ThemeProvider";
import { typography } from "../theme/typography";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import Icon

const LoginScreen = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation(); // Access the navigation prop via the hook
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Validation Functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
    return passwordRegex.test(password);
  };

  const isFormValid = validateEmail(email) && validatePassword(password);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Image */}
      <Image
        source={require("../assets/images/signup.png")}
        style={styles.image}
        resizeMode="contain"
      />
      {/* Title */}
      <Text
        style={[styles.title, typography.title, { color: theme.colors.title }]}
      >
        Welcome Back
      </Text>
      {/* Email Input */}
      <Text
        style={[
          styles.subtitle,
          typography.body,
          {
            color: theme.colors.title,
            alignSelf: "flex-start",
            marginLeft: "5%",
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
            color: theme.colors.text,
          },
        ]}
        placeholder="Enter your Email"
        placeholderTextColor={theme.colors.placeholder}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors({
            ...errors,
            email: validateEmail(text) ? "" : "Invalid email format",
          });
        }}
        keyboardType="email-address"
      />
      {errors.email ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.email}
        </Text>
      ) : null}

      {/* Password Input */}
      <Text
        style={[
          styles.subtitle,
          typography.body,
          {
            color: theme.colors.title,
            alignSelf: "flex-start",
            marginLeft: "5%",
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
          placeholder="Enter your Password"
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
            name={passwordVisible ? "eye-off" : "eye"}
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

      {/* Sign In Button */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isFormValid
              ? theme.colors.primary
              : theme.colors.disabled,
          },
        ]}
        onPress={() => {
          if (isFormValid) {
            navigation.navigate("Home", { email }); // Pass the email to HomeScreen
          }
        }}
        disabled={!isFormValid}
      >
        <Text
          style={[
            styles.buttonText,
            typography.smallText,
            { color: theme.colors.buttonText },
          ]}
        >
          Sign In
        </Text>
      </TouchableOpacity>
      {/* Sign Up Link */}
      <Text
        style={[
          styles.footerText,
          typography.smallText,
          { color: theme.colors.subtitle },
        ]}
      >
        Don't you have an account?{" "}
        <Text
          style={[
            styles.linkText,
            typography.smallText,
            { color: theme.colors.primary },
          ]}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
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
    paddingHorizontal: 20,
  },
  image: {
    width: 270,
    height: 200,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
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
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  iconContainer: {
    marginLeft: 10,
  },
  button: {
    width: "90%",
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 10,
  },
});

export default LoginScreen;