import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import {
  Colors,
  BorderRadius,
  FontFamily,
  FontSize,
  Spacing,
} from "../../../common/theme";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
  disabled?: boolean;
}

// Reusable Button component used across all screens
const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}) => {
  const isOutline = variant === "outline";
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        isOutline && styles.outline,
        isSecondary && styles.secondary,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? Colors.primary : "#fff"} />
      ) : (
        <Text style={[styles.label, isOutline && styles.outlineLabel]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm + 4,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: "#fff",
    fontSize: FontSize.md,
    fontFamily: FontFamily.semiBold,
  },
  outlineLabel: {
    color: Colors.primary,
  },
});

export default Button;
