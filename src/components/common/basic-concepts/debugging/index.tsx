import React, { useState } from 'react'
import { Text, View, Pressable, ScrollView } from 'react-native'
import { DevToolsLog } from './debugging.type'
import { styles } from './debugging.style'

export default function DebuggingExample() {
    const [logs, setLogs] = useState<DevToolsLog[]>([
        { time: new Date().toLocaleTimeString(), type: 'log', message: 'Debugging session started.' },
    ])
    const [isTriggered, setIsTriggered] = useState(false)

    const addLog = (type: 'log' | 'warn' | 'error' | 'network', message: string) => {
        const newLog: DevToolsLog = {
            time: new Date().toLocaleTimeString(),
            type,
            message,
        }
        setLogs((prev) => [newLog, ...prev])

        // Actively trigger in console for real inspection
        if (type === 'log') console.log('[DevTools Demo]:', message)
        if (type === 'warn') console.warn('[DevTools Demo]:', message)
        if (type === 'error') console.error('[DevTools Demo]:', message)
    }

    const triggerNetworkCall = async () => {
        addLog('network', 'GET https://jsonplaceholder.typicode.com/posts/1 - Pending')
        try {
            const start = performance.now()
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
            const data = await response.json()
            const elapsed = performance.now() - start
            addLog(
                'network',
                `GET https://jsonplaceholder.typicode.com/posts/1 - Status 200 OK (${elapsed.toFixed(0)}ms)\nResponse: ${JSON.stringify(data).slice(0, 50)}...`,
            )
        } catch (e: any) {
            addLog('error', `Network failure: ${e.message}`)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Debugging Tools</Text>
            <Text style={styles.subtitle}>
                Simulates console logging and network inspecting captured by Chrome & React DevTools.
            </Text>

            <View style={styles.card}>
                <Text style={styles.label}>Console Actions (Fires real logs)</Text>
                <View style={styles.buttonRow}>
                    <Pressable style={styles.btnLog} onPress={() => addLog('log', 'Standard info log triggered.')}>
                        <Text style={styles.btnTextPrimary}>info</Text>
                    </Pressable>
                    <Pressable
                        style={styles.btnWarn}
                        onPress={() => addLog('warn', 'React Native state warning simulation.')}
                    >
                        <Text style={styles.btnText}>warning</Text>
                    </Pressable>
                    <Pressable
                        style={styles.btnError}
                        onPress={() => addLog('error', 'Caught error exception printed.')}
                    >
                        <Text style={styles.btnTextPrimary}>error</Text>
                    </Pressable>
                </View>

                <View style={[styles.buttonRow, { marginTop: styles.card.marginBottom }]}>
                    <Pressable style={styles.btnNetwork} onPress={triggerNetworkCall}>
                        <Text style={styles.btnTextPrimary}>Trigger inspectable HTTP Call</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.btnToggle, isTriggered && styles.btnActive]}
                        onPress={() => {
                            setIsTriggered(!isTriggered)
                            addLog('log', `React state changed. isTriggered: ${!isTriggered}`)
                        }}
                    >
                        <Text style={styles.btnTextPrimary}>Toggle Hook State</Text>
                    </Pressable>
                </View>
            </View>

            <Text style={styles.sectionHeader}>Console Logger Simulator:</Text>
            <ScrollView style={styles.logBox} contentContainerStyle={styles.logContent}>
                {logs.map((log, index) => (
                    <View key={index} style={styles.logLine}>
                        <Text style={styles.logTime}>[{log.time}]</Text>
                        <Text
                            style={[
                                styles.logMessage,
                                log.type === 'warn' && styles.logWarn,
                                log.type === 'error' && styles.logError,
                                log.type === 'network' && styles.logNetwork,
                            ]}
                        >
                            {log.type.toUpperCase()}: {log.message}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
