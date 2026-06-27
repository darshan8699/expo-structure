import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, TextInput, ActivityIndicator } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { styles } from './secure-storage.style'

export default function SecureStorageExample() {
    const [inputValue, setInputValue] = useState('')
    const [securedToken, setSecuredToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const loadToken = async () => {
        setLoading(true)
        try {
            // Asynchronous read (requires await)
            const token = await SecureStore.getItemAsync('user_access_token')
            setSecuredToken(token)
        } catch (e) {
            console.error('Failed to load token from SecureStore', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            loadToken()
        }, 0)
        return () => clearTimeout(timer)
    }, [])

    const saveToken = async () => {
        if (!inputValue) return
        setLoading(true)
        try {
            // Asynchronous write (requires await)
            await SecureStore.setItemAsync('user_access_token', inputValue)
            setSecuredToken(inputValue)
            setInputValue('')
        } catch (e) {
            console.error('Failed to save token to SecureStore', e)
        } finally {
            setLoading(false)
        }
    }

    const deleteToken = async () => {
        setLoading(true)
        try {
            // Asynchronous delete (requires await)
            await SecureStore.deleteItemAsync('user_access_token')
            setSecuredToken(null)
        } catch (e) {
            console.error('Failed to delete token from SecureStore', e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Secure Keychain Store</Text>
            <Text style={styles.subtitle}>
                Uses iOS Keychain / Android Keystore for encrypted sensitive data storage.
            </Text>

            <View style={styles.card}>
                <Text style={styles.label}>Encrypted Authentication Token:</Text>

                {loading ? (
                    <ActivityIndicator size="small" color={styles.btnSave.backgroundColor} style={styles.spinner} />
                ) : (
                    <Text style={styles.savedTokenText}>
                        {securedToken ? `🔑 ${securedToken}` : <Text style={styles.italic}>No Token Saved</Text>}
                    </Text>
                )}

                <View style={styles.buttonRow}>
                    <Pressable style={styles.btnSecondary} onPress={deleteToken} disabled={loading}>
                        <Text style={styles.btnText}>Delete Token</Text>
                    </Pressable>
                    <Pressable style={styles.btnPrimary} onPress={loadToken} disabled={loading}>
                        <Text style={styles.btnTextPrimary}>Reload Token</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.inputLabel}>Encrypt new Auth Secret:</Text>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. eyJhbGciOiJIUzI1NiIsIn..."
                        value={inputValue}
                        onChangeText={setInputValue}
                        secureTextEntry
                        disabled={loading}
                    />
                    <Pressable style={styles.btnSave} onPress={saveToken} disabled={loading}>
                        <Text style={styles.btnTextPrimary}>Encrypt</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
