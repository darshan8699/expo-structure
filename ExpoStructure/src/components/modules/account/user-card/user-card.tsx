import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  Colors,
  BorderRadius,
  FontFamily,
  FontSize,
  Spacing,
} from "../../../../common/theme";
import type { User } from "../../../../common/types";

interface UserCardProps {
  user: User;
  onPress?: () => void;
}

// Feature-specific component — shown on the Home screen
const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{user.role}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  avatarText: {
    color: "#fff",
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
  },
  info: { flex: 1 },
  name: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.semiBold,
    color: Colors.text,
  },
  email: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  badge: {
    marginTop: Spacing.xs,
    alignSelf: "flex-start",
    backgroundColor: Colors.primary + "20",
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontFamily: FontFamily.medium,
  },
});

export default UserCard;
