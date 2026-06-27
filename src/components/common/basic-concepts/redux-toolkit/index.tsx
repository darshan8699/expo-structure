import React, { useState } from 'react'
import { Text, View, Pressable, TextInput } from 'react-native'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RTKState } from './redux-toolkit.type'
import { styles } from './redux-toolkit.style'

// --- 1. Redux Toolkit Setup ---

const initialState: RTKState = {
    value: 0,
    lastAction: 'None',
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Immer allows us to write "mutating" logic safely
            state.value += 1
            state.lastAction = 'increment'
        },
        decrement: (state) => {
            state.value -= 1
            state.lastAction = 'decrement'
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
            state.lastAction = `incrementByAmount (${action.payload})`
        },
        reset: (state) => {
            state.value = 0
            state.lastAction = 'reset'
        },
    },
})

const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

const localStore = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
})

type RootState = ReturnType<typeof localStore.getState>

// --- 2. UI Component ---

function RTKCounterUI() {
    const dispatch = useDispatch()
    const value = useSelector((state: RootState) => state.counter.value)
    const lastAction = useSelector((state: RootState) => state.counter.lastAction)
    const [amount, setAmount] = useState('5')

    const handleIncrementByAmount = () => {
        const parsed = parseInt(amount, 10)
        if (!isNaN(parsed)) {
            dispatch(incrementByAmount(parsed))
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Redux Toolkit (RTK)</Text>
            <Text style={styles.subtitle}>Uses configureStore, createSlice, action payload, and Immer mutations.</Text>

            <View style={styles.card}>
                <Text style={styles.label}>RTK Counter Value</Text>
                <Text style={styles.counterText}>{value}</Text>
                <Text style={styles.actionText}>
                    Last Dispatched Action: <Text style={styles.boldText}>{lastAction}</Text>
                </Text>

                <View style={styles.buttonRow}>
                    <Pressable style={styles.btnSecondary} onPress={() => dispatch(decrement())}>
                        <Text style={styles.btnText}>- Decrement</Text>
                    </Pressable>
                    <Pressable style={styles.btnDanger} onPress={() => dispatch(reset())}>
                        <Text style={styles.btnText}>Reset</Text>
                    </Pressable>
                    <Pressable style={styles.btnPrimary} onPress={() => dispatch(increment())}>
                        <Text style={styles.btnText}>+ Increment</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.inputLabel}>Increment by custom value:</Text>
                <View style={styles.inputRow}>
                    <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />
                    <Pressable style={styles.btnCustom} onPress={handleIncrementByAmount}>
                        <Text style={styles.btnText}>Dispatch Amount</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

// --- 3. Wrapped Export ---

export default function ReduxToolkitExample() {
    return (
        <Provider store={localStore}>
            <RTKCounterUI />
        </Provider>
    )
}
