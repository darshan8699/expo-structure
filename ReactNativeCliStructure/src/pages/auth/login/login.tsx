import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Spacing } from "../../../common/theme";
import Button from "../../../components/common/button/button";

const LoginScreen: React.FC = () => {
  const handleLogin = () => {
    console.log("Login pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <View style={styles.buttonContainer}>
        <Button label="Sign In" onPress={handleLogin} variant="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: FontSize.display,
    fontFamily: FontFamily.bold,
    color: Colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.regular,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  buttonContainer: {
    marginTop: Spacing.md,
  },
});

export default LoginScreen;
