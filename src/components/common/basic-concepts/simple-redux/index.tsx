import React from 'react'
import { Text, View, Pressable, ScrollView } from 'react-native'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import { ReduxState, CounterActions, INCREMENT, DECREMENT, RESET } from './simple-redux.type'
import { styles } from './simple-redux.style'

// --- 1. Redux Setup (Initial State, Reducer, Store) ---

const initialState: ReduxState = {
    count: 0,
    history: ['Store Initialized (Count: 0)'],
}

function counterReducer(state = initialState, action: CounterActions): ReduxState {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1,
                history: [`Dispatched: INCREMENT (New: ${state.count + 1})`, ...state.history],
            }
        case DECREMENT:
            return {
                count: state.count - 1,
                history: [`Dispatched: DECREMENT (New: ${state.count - 1})`, ...state.history],
            }
        case RESET:
            return {
                count: 0,
                history: [`Dispatched: RESET (New: 0)`, ...state.history],
            }
        default:
            return state
    }
}

const localStore = createStore(counterReducer)

// --- 2. Counter Component UI ---

function CounterUI() {
    const dispatch = useDispatch()
    const count = useSelector((state: ReduxState) => state.count)
    const history = useSelector((state: ReduxState) => state.history)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Simple Redux Example</Text>
            <Text style={styles.subtitle}>Uses legacy createStore, dispatch, actions, and reducers.</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Current Count</Text>
                <Text style={styles.counterText}>{count}</Text>

                <View style={styles.buttonRow}>
                    <Pressable style={styles.btnSecondary} onPress={() => dispatch({ type: DECREMENT })}>
                        <Text style={styles.btnText}>- Decrement</Text>
                    </Pressable>
                    <Pressable style={styles.btnDanger} onPress={() => dispatch({ type: RESET })}>
                        <Text style={styles.btnText}>Reset</Text>
                    </Pressable>
                    <Pressable style={styles.btnPrimary} onPress={() => dispatch({ type: INCREMENT })}>
                        <Text style={styles.btnText}>+ Increment</Text>
                    </Pressable>
                </View>
            </View>

            <Text style={styles.sectionHeader}>Action Logs (State History):</Text>
            <ScrollView style={styles.logContainer} contentContainerStyle={styles.logContent}>
                {history.map((log, index) => (
                    <View key={index} style={styles.logItem}>
                        <Text style={styles.logText}>{log}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

// --- 3. Wrapped Export with Store Provider ---

export default function SimpleReduxExample() {
    return (
        <Provider store={localStore}>
            <CounterUI />
        </Provider>
    )
}
