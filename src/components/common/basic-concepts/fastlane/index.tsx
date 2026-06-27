import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { BuildStep } from './fastlane.type'
import { styles } from './fastlane.style'

const IOS_BETA_STEPS: BuildStep[] = [
    { message: 'Fastlane detected platform: ios. Initializing lane :beta...', delay: 500, type: 'info' },
    { message: 'Running match: syncing App Store credentials and profiles...', delay: 1000, type: 'info' },
    { message: 'Successfully fetched Match profile for bundle: com.expostructure', delay: 800, type: 'success' },
    { message: 'Executing increment_build_number: version 1.0.1 -> 1.0.2', delay: 600, type: 'info' },
    { message: 'Executing gym: compiling Xcode workspace (Compiling Swift/C++)...', delay: 1500, type: 'info' },
    { message: 'Xcode archive successfully generated: expostructure.ipa (14.2 MB)', delay: 1000, type: 'success' },
    { message: 'Executing pilot: uploading binary to Apple App Store Connect...', delay: 1500, type: 'info' },
    { message: 'Processing complete. Build is visible on TestFlight dashboard.', delay: 1000, type: 'success' },
    { message: 'lane :beta executed successfully! 🎉', delay: 500, type: 'success' },
]

const ANDROID_BETA_STEPS: BuildStep[] = [
    { message: 'Fastlane detected platform: android. Initializing lane :beta...', delay: 500, type: 'info' },
    { message: 'Verifying google_play_services credentials json file...', delay: 800, type: 'info' },
    { message: 'Executing gradle: compiling release bundle (Executing assembleRelease)...', delay: 1500, type: 'info' },
    { message: 'Build successful. Generated: app-release.aab (18.6 MB)', delay: 1000, type: 'success' },
    {
        message: 'Executing supply: uploading Android App Bundle to Google Play internal sharing...',
        delay: 1500,
        type: 'info',
    },
    { message: 'Upload successfully finished. Track updated.', delay: 1000, type: 'success' },
    { message: 'lane :beta executed successfully! 🚀', delay: 500, type: 'success' },
]

export default function FastlaneExample() {
    const [platform, setPlatform] = useState<'ios' | 'android'>('ios')
    const [terminalLogs, setTerminalLogs] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState(false)
    const [progress, setProgress] = useState(0)

    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const scrollViewRef = useRef<ScrollView | null>(null)

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [])

    const runPipeline = () => {
        if (isRunning) return
        setIsRunning(true)
        setProgress(0)
        setTerminalLogs(['$ fastlane ' + platform + ' beta'])

        const steps = platform === 'ios' ? IOS_BETA_STEPS : ANDROID_BETA_STEPS
        let stepIndex = 0

        const executeNextStep = () => {
            if (stepIndex >= steps.length) {
                setIsRunning(false)
                setProgress(100)
                return
            }

            const current = steps[stepIndex]
            const logLine = `[${new Date().toLocaleTimeString()}] ${current.type === 'success' ? '✅' : '⚙️'} ${current.message}`

            setTerminalLogs((prev) => [...prev, logLine])
            setProgress(Math.floor(((stepIndex + 1) / steps.length) * 100))

            scrollViewRef.current?.scrollToEnd({ animated: true })

            stepIndex++
            timerRef.current = setTimeout(executeNextStep, current.delay)
        }

        timerRef.current = setTimeout(executeNextStep, 500)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fastlane Deployment Simulator</Text>
            <Text style={styles.subtitle}>
                Select a platform build pipeline to simulate Fastlane release automation.
            </Text>

            <View style={styles.card}>
                <Text style={styles.label}>Select Target Platform</Text>
                <View style={styles.platformRow}>
                    <Pressable
                        style={[styles.platformBtn, platform === 'ios' && styles.platformBtnActive]}
                        onPress={() => !isRunning && setPlatform('ios')}
                    >
                        <Text style={[styles.platformText, platform === 'ios' && styles.platformTextActive]}>
                             iOS Pipeline
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.platformBtn, platform === 'android' && styles.platformBtnActive]}
                        onPress={() => !isRunning && setPlatform('android')}
                    >
                        <Text style={[styles.platformText, platform === 'android' && styles.platformTextActive]}>
                            🤖 Android Pipeline
                        </Text>
                    </Pressable>
                </View>

                <Pressable
                    style={[styles.btnRun, isRunning && styles.btnDisabled]}
                    onPress={runPipeline}
                    disabled={isRunning}
                >
                    <Text style={styles.btnRunText}>
                        {isRunning ? 'Pipeline Running...' : 'Run fastlane ' + platform + ' beta'}
                    </Text>
                </Pressable>
            </View>

            {terminalLogs.length > 0 && (
                <View style={styles.terminalContainer}>
                    <View style={styles.terminalHeader}>
                        <View style={styles.dotsRow}>
                            <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
                            <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
                            <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
                        </View>
                        <Text style={styles.terminalTitle}>fastlane-bash-terminal - {platform}</Text>
                    </View>

                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.terminalBody}
                        contentContainerStyle={styles.terminalContent}
                    >
                        {terminalLogs.map((log, index) => (
                            <Text key={index} style={[styles.terminalTextLine, index === 0 && styles.terminalPrompt]}>
                                {log}
                            </Text>
                        ))}
                        {isRunning && <ActivityIndicator size="small" color="#fff" style={styles.terminalLoader} />}
                    </ScrollView>

                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                    </View>
                </View>
            )}
        </View>
    )
}
