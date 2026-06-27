import React from 'react'
import { Text, View, Pressable, ActivityIndicator } from 'react-native'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'
import { SagaState } from './redux-saga.type'
import { styles } from './redux-saga.style'

// --- 1. Redux Actions & State Setup ---

const FETCH_TODO_REQUEST = 'FETCH_TODO_REQUEST'
const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS'
const FETCH_TODO_FAILURE = 'FETCH_TODO_FAILURE'

const initialState: SagaState = {
    todo: null,
    loading: false,
    error: null,
}

function sagaReducer(state = initialState, action: any): SagaState {
    switch (action.type) {
        case FETCH_TODO_REQUEST:
            return { ...state, loading: true, error: null, todo: null }
        case FETCH_TODO_SUCCESS:
            return { ...state, loading: false, todo: action.payload }
        case FETCH_TODO_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

// --- 2. Saga Generator Workflows ---

const apiFetchTodo = async () => {
    const todoId = Math.floor(Math.random() * 20) + 1
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
    if (!response.ok) {
        throw new Error('Failed to load todo item')
    }
    return response.json()
}

// Worker Saga: handles side effects
function* fetchTodoWorkerSaga(): Generator<any, void, any> {
    try {
        // yield call(apiFn) pauses execution until apiFn resolves
        const todo = yield call(apiFetchTodo)
        // yield put(action) dispatches action to store
        yield put({ type: FETCH_TODO_SUCCESS, payload: todo })
    } catch (e: any) {
        yield put({ type: FETCH_TODO_FAILURE, payload: e.message || 'Saga execution failed' })
    }
}

// Watcher Saga: spawns worker saga for every FETCH_TODO_REQUEST
function* rootSaga() {
    yield takeEvery(FETCH_TODO_REQUEST, fetchTodoWorkerSaga)
}

// --- 3. Store Configuration with Saga Middleware ---

const sagaMiddleware = createSagaMiddleware()
const localStore = createStore(combineReducers({ sagaDemo: sagaReducer }), applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

// --- 4. UI Component ---

function SagaUI() {
    const dispatch = useDispatch()
    const { todo, loading, error } = useSelector((state: any) => state.sagaDemo)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Redux Saga Example</Text>
            <Text style={styles.subtitle}>
                Uses ES6 Generators (function*) and Saga Effects (call, put, takeEvery).
            </Text>

            <View style={styles.card}>
                <Pressable
                    style={[styles.btnPrimary, loading && styles.btnDisabled]}
                    onPress={() => dispatch({ type: FETCH_TODO_REQUEST })}
                    disabled={loading}
                >
                    <Text style={styles.btnText}>{loading ? 'Saga Intercepting...' : 'Fetch Random Todo'}</Text>
                </Pressable>

                <View style={styles.detailsContainer}>
                    {loading && (
                        <View style={styles.loadingWrapper}>
                            <ActivityIndicator size="large" color={styles.btnPrimary.backgroundColor} />
                            <Text style={styles.statusText}>Watcher caught action, running worker saga...</Text>
                        </View>
                    )}

                    {error && (
                        <View style={styles.errorWrapper}>
                            <Text style={styles.errorText}>Saga Error: {error}</Text>
                        </View>
                    )}

                    {todo && (
                        <View style={styles.todoCard}>
                            <View style={styles.todoHeader}>
                                <Text style={styles.todoId}>Todo #{todo.id}</Text>
                                <View
                                    style={[styles.badge, todo.completed ? styles.badgeCompleted : styles.badgePending]}
                                >
                                    <Text style={styles.badgeText}>{todo.completed ? 'Completed' : 'Pending'}</Text>
                                </View>
                            </View>
                            <Text style={styles.todoTitle}>&quot;{todo.title}&quot;</Text>
                            <View style={styles.divider} />
                            <Text style={styles.infoText}>
                                This data flow was intercepted by Saga Middleware before dispatching FETCH_TODO_SUCCESS.
                            </Text>
                        </View>
                    )}

                    {!loading && !error && !todo && (
                        <Text style={styles.placeholderText}>
                            Tap the button to dispatch a request action and trigger the Saga watcher.
                        </Text>
                    )}
                </View>
            </View>
        </View>
    )
}

// --- 5. Wrapped Export ---

export default function ReduxSagaExample() {
    return (
        <Provider store={localStore}>
            <SagaUI />
        </Provider>
    )
}
