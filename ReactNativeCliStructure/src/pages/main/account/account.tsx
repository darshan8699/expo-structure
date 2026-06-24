import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Spacing } from "../../../common/theme";

const AccountScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <Text style={styles.subtitle}>Profile details and information</Text>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>John Doe</Text>
        <Text style={styles.infoSub}>john.doe@example.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxl,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: Colors.textMuted,
    marginBottom: Spacing.xl,
  },
  infoCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.semiBold,
    color: Colors.text,
  },
  infoSub: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
});

export default AccountScreen;
