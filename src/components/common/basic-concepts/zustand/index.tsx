import React from 'react'
import { Text, View, Pressable } from 'react-native'
import { create } from 'zustand'
import { BearStore } from './zustand.type'
import { styles } from './zustand.style'

// --- 1. Zustand Store Definition ---

const useBearStore = create<BearStore>((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}))

// --- 2. UI Component ---

export default function ZustandExample() {
    // Selectors ensure components only re-render when the selected state changes
    const bears = useBearStore((state) => state.bears)
    const increasePopulation = useBearStore((state) => state.increasePopulation)
    const removeAllBears = useBearStore((state) => state.removeAllBears)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Zustand Store Hook</Text>
            <Text style={styles.subtitle}>
                Uses a hook-based store. Zero boilerplate, zero providers, selector subscription.
            </Text>

            <View style={styles.card}>
                <Text style={styles.label}>Total Bears in Woods</Text>
                <Text style={styles.counterText}>{bears}</Text>

                <View style={styles.buttonRow}>
                    <Pressable style={styles.btnSecondary} onPress={removeAllBears}>
                        <Text style={styles.btnText}>Remove All Bears</Text>
                    </Pressable>
                    <Pressable style={styles.btnPrimary} onPress={increasePopulation}>
                        <Text style={styles.btnTextPrimary}>+ Add a Bear</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.tipTitle}>💡 Developer Info:</Text>
                <Text style={styles.tipText}>
                    Zustand does not wrap components in Context Providers. The store is created using standard JS
                    closure hooks, bypassing React context and boosting render speed.
                </Text>
            </View>
        </View>
    )
}
