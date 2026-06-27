import React from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { useRouter, Stack } from 'expo-router'
import { Colors, BorderRadius, FontFamily, FontSize, Spacing } from '@/common/theme'

interface ConceptMenuItem {
    id: string
    title: string
    subtitle: string
    icon: string
}

interface CategoryGroup {
    title: string
    items: ConceptMenuItem[]
}

const CATEGORIES: CategoryGroup[] = [
    {
        title: 'State Management',
        items: [
            { id: 'simple-redux', title: 'Simple Redux', subtitle: 'Store, Action, Reducers, Dispatcher', icon: '⚛️' },
            {
                id: 'redux-toolkit',
                title: 'Redux Toolkit (RTK)',
                subtitle: 'opinionated toolset, slices, actions',
                icon: '🛠️',
            },
            {
                id: 'redux-thunk',
                title: 'Redux Thunk',
                subtitle: 'Asynchronous side effects action creators',
                icon: '⚡',
            },
            {
                id: 'redux-saga',
                title: 'Redux Saga',
                subtitle: 'Generators (function*), complex workflows',
                icon: '🌀',
            },
            { id: 'mobx', title: 'MobX', subtitle: 'Observable state tracking, auto reactivity', icon: '📈' },
            { id: 'zustand', title: 'Zustand', subtitle: 'Minimalist hook state, no context boilerplate', icon: '🐻' },
        ],
    },
    {
        title: 'Data Queries',
        items: [
            {
                id: 'react-query',
                title: 'React Query',
                subtitle: 'Server caching, background syncing, stale states',
                icon: '📡',
            },
        ],
    },
    {
        title: 'Local Storage',
        items: [
            { id: 'mmkv', title: 'MMKV Storage', subtitle: 'Ultra-fast synchronous JSI file mapping', icon: '💾' },
            {
                id: 'secure-storage',
                title: 'Secure Storage',
                subtitle: 'Encrypted keychain credentials storage',
                icon: '🔒',
            },
        ],
    },
    {
        title: 'Form Validation',
        items: [
            {
                id: 'react-hook-form',
                title: 'React Hook Form',
                subtitle: 'Performance refs, uncontrolled inputs',
                icon: '📋',
            },
            {
                id: 'formik-yup',
                title: 'Formik & Yup',
                subtitle: 'Controlled forms, schema rules matching',
                icon: '✔️',
            },
        ],
    },
    {
        title: 'Utilities & CI/CD',
        items: [
            {
                id: 'debugging',
                title: 'React DevTools / Flipper',
                subtitle: 'Component profiler, debug console triggers',
                icon: '🐞',
            },
            {
                id: 'fastlane',
                title: 'Fastlane Automation',
                subtitle: 'Fastfile, lane compile pipelines simulator',
                icon: '🚀',
            },
        ],
    },
]

export default function HomeScreen() {
    const router = useRouter()

    const handleNavigate = (id: string) => {
        router.push(`/concepts/${id}`)
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header Block */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Expo Structure</Text>
                <Text style={styles.headerSubtitle}>Basic Concepts & Playground Examples</Text>
            </View>

            {/* Menu List */}
            <ScrollView style={styles.menuContainer} contentContainerStyle={styles.scrollContent}>
                {CATEGORIES.map((cat, catIdx) => (
                    <View key={catIdx} style={styles.categorySection}>
                        <Text style={styles.categoryTitle}>{cat.title}</Text>
                        <View style={styles.cardGrid}>
                            {cat.items.map((item) => (
                                <Pressable
                                    key={item.id}
                                    style={({ pressed }) => [styles.conceptCard, pressed && styles.conceptCardPressed]}
                                    onPress={() => handleNavigate(item.id)}
                                >
                                    <View style={styles.iconContainer}>
                                        <Text style={styles.icon}>{item.icon}</Text>
                                    </View>
                                    <View style={styles.cardTextContainer}>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                                    </View>
                                    <Text style={styles.arrow}>›</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        backgroundColor: Colors.primary,
        paddingTop: 64,
        paddingBottom: Spacing.xl,
        paddingHorizontal: Spacing.lg,
        borderBottomLeftRadius: BorderRadius.lg + 8,
        borderBottomRightRadius: BorderRadius.lg + 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    headerTitle: {
        fontSize: FontSize.xxl,
        fontFamily: FontFamily.bold,
        color: '#ffffff',
    },
    headerSubtitle: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.medium,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: Spacing.xs,
    },
    menuContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    categorySection: {
        marginBottom: Spacing.lg,
    },
    categoryTitle: {
        fontSize: FontSize.md,
        fontFamily: FontFamily.bold,
        color: Colors.text,
        marginBottom: Spacing.sm,
        marginLeft: Spacing.xs,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    cardGrid: {
        gap: Spacing.sm,
    },
    conceptCard: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    conceptCardPressed: {
        backgroundColor: '#F3F4F6',
        transform: [{ scale: 0.99 }],
    },
    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: BorderRadius.sm + 4,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    icon: {
        fontSize: FontSize.lg,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: FontSize.md - 1,
        fontFamily: FontFamily.bold,
        color: Colors.text,
    },
    cardSubtitle: {
        fontSize: FontSize.xs,
        fontFamily: FontFamily.regular,
        color: Colors.textMuted,
        marginTop: 2,
    },
    arrow: {
        fontSize: FontSize.xl + 4,
        color: Colors.textMuted,
        fontFamily: FontFamily.light,
        paddingHorizontal: Spacing.xs,
    },
})
