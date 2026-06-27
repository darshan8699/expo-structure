import React from 'react'
import { Text, View, Pressable } from 'react-native'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { styles } from './mobx.style'

// --- 1. MobX Store Setup ---

class TimerStore {
    secondsPassed = 0
    ticksHistory: string[] = []

    constructor() {
        // Automatically makes all properties observable and methods actions
        makeAutoObservable(this)
    }

    // Action
    increaseTimer() {
        this.secondsPassed += 1
        this.ticksHistory.unshift(`Tick count: ${this.secondsPassed} at ${new Date().toLocaleTimeString()}`)
    }

    // Action
    resetTimer() {
        this.secondsPassed = 0
        this.ticksHistory = ['Timer Reset']
    }

    // Computed Value (Getter)
    get doubleSeconds() {
        return this.secondsPassed * 2
    }
}

const myTimerStore = new TimerStore()

// --- 2. UI Component ---
// Wrapping the component with observer() makes it reactive to store changes
const MobXUI = observer(() => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>MobX Reactive Store</Text>
            <Text style={styles.subtitle}>Uses makeAutoObservable, class-based state, and observer wrapper.</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Seconds Passed</Text>
                <Text style={styles.counterText}>{myTimerStore.secondsPassed}</Text>

                <Text style={styles.computedText}>
                    Computed Double: <Text style={styles.boldText}>{myTimerStore.doubleSeconds}</Text>
                </Text>

                <View style={styles.buttonRow}>
                    <Pressable style={styles.btnSecondary} onPress={() => myTimerStore.resetTimer()}>
                        <Text style={styles.btnText}>Reset Timer</Text>
                    </Pressable>
                    <Pressable style={styles.btnPrimary} onPress={() => myTimerStore.increaseTimer()}>
                        <Text style={[styles.btnText, { color: '#fff' }]}>+ Tick Timer</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.historyTitle}>MobX Reaction logs:</Text>
                {myTimerStore.ticksHistory.slice(0, 3).map((tick, index) => (
                    <Text key={index} style={styles.tickLog}>
                        • {tick}
                    </Text>
                ))}
                {myTimerStore.ticksHistory.length === 0 && (
                    <Text style={styles.placeholderText}>Tap &quot;+ Tick Timer&quot; to fire actions.</Text>
                )}
            </View>
        </View>
    )
})

export default MobXUI
