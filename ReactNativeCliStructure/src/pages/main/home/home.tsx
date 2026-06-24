import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Colors, FontFamily, FontSize, Spacing } from "../../../common/theme";
import { MOCK_USERS } from "../../../data/mock-users.data";
import UserCard from "../../../components/modules/account/user-card/user-card";

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Client & HR Demo Overview</Text>

      <FlatList
        data={MOCK_USERS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() => console.log("User pressed:", item.name)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
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
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingVertical: Spacing.sm,
  },
});

export default HomeScreen;
