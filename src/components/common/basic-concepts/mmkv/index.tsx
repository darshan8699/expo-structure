import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, TextInput } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { styles } from './mmkv.style'

// --- 1. MMKV Storage Instantiation ---
const mmkvStorage = new MMKV()

export default function MMKVExample() {
    const [inputValue, setInputValue] = useState('')
    const [savedValue, setSavedValue] = useState<string | null>(null)
    const [readLatency, setReadLatency] = useState<number | null>(null)

    const loadData = () => {
        const start = performance.now()
        // Synchronous read - no await needed!
        const val = mmkvStorage.getString('user_preference')
        const end = performance.now()

        setSavedValue(val || null)
        setReadLatency(end - start)
    }

    // Load initial value
    useEffect(() => {
        const timer = setTimeout(() => {
            loadData()
        }, 0)
        return () => clearTimeout(timer)
    }, [])

    const saveData = () => {
        // Synchronous write - instant JSI direct call
        mmkvStorage.set('user_preference', inputValue)
        loadData()
        setInputValue('')
    }

    const clearData = () => {
        // Synchronous delete
        mmkvStorage.delete('user_preference')
        loadData()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MMKV Key-Value Store</Text>
            <Text style={styles.subtitle}>
                Uses JSI synchronous access for extreme file-mapping persistence speeds.
            </Text>

            <View style={styles.card}>
                <Text style={styles.label}>Persistent Data Store:</Text>
                <Text style={styles.savedValueText}>
                    {savedValue ? `"${savedValue}"` : <Text style={styles.italic}>Empty</Text>}
                </Text>

                {readLatency !== null && (
                    <Text style={styles.latencyText}>
                        Read execution speed: <Text style={styles.speedColor}>{readLatency.toFixed(4)} ms</Text>{' '}
                        (Synchronous)
                    </Text>
                )}

                <View style={styles.buttonRow}>
                    <Pressable style={styles.btnSecondary} onPress={clearData}>
                        <Text style={styles.btnText}>Delete Data</Text>
                    </Pressable>
                    <Pressable style={styles.btnPrimary} onPress={loadData}>
                        <Text style={styles.btnTextPrimary}>Force Reload</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.inputLabel}>Write value to storage:</Text>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type something to store..."
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <Pressable style={styles.btnSave} onPress={saveData}>
                        <Text style={styles.btnTextPrimary}>Save</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
