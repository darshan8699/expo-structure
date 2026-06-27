import React from 'react'
import { Text, View, Pressable, ActivityIndicator } from 'react-native'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User, ThunkState } from './redux-thunk.type'
import { styles } from './redux-thunk.style'

// --- 1. Redux Thunk Setup ---

const initialState: ThunkState = {
    user: null,
    loading: false,
    error: null,
}

// Async action creator using thunk
export const fetchRandomUser = createAsyncThunk('user/fetchRandom', async (_, { rejectWithValue }) => {
    try {
        const userId = Math.floor(Math.random() * 10) + 1
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        if (!response.ok) {
            throw new Error('Failed to fetch user data')
        }
        const data = (await response.json()) as User
        return data
    } catch (err: any) {
        return rejectWithValue(err.message || 'Something went wrong')
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomUser.pending, (state) => {
                state.loading = true
                state.error = null
                state.user = null
            })
            .addCase(fetchRandomUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(fetchRandomUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

const localStore = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
})

type RootState = ReturnType<typeof localStore.getState>
type AppDispatch = typeof localStore.dispatch

// --- 2. UI Component ---

function ThunkUI() {
    const dispatch = useDispatch<AppDispatch>()
    const { user, loading, error } = useSelector((state: RootState) => state.user)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Redux Thunk Example</Text>
            <Text style={styles.subtitle}>Uses createAsyncThunk to perform side effects and update state states.</Text>

            <View style={styles.card}>
                <Pressable
                    style={[styles.btnPrimary, loading && styles.btnDisabled]}
                    onPress={() => dispatch(fetchRandomUser())}
                    disabled={loading}
                >
                    <Text style={styles.btnText}>{loading ? 'Fetching User...' : 'Fetch Random User'}</Text>
                </Pressable>

                <View style={styles.detailsContainer}>
                    {loading && (
                        <View style={styles.loadingWrapper}>
                            <ActivityIndicator size="large" color={styles.btnPrimary.backgroundColor} />
                            <Text style={styles.statusText}>Request Sent (Thunk Pending)...</Text>
                        </View>
                    )}

                    {error && (
                        <View style={styles.errorWrapper}>
                            <Text style={styles.errorText}>Error: {error}</Text>
                        </View>
                    )}

                    {user && (
                        <View style={styles.profileCard}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
                            </View>
                            <Text style={styles.profileName}>{user.name}</Text>
                            <Text style={styles.profileMeta}>@{user.username}</Text>
                            <View style={styles.divider} />
                            <Text style={styles.profileDetail}>📧 {user.email}</Text>
                            <Text style={styles.profileDetail}>🏢 {user.company.name}</Text>
                            <Text style={styles.successBadge}>Thunk Fulfilled</Text>
                        </View>
                    )}

                    {!loading && !error && !user && (
                        <Text style={styles.placeholderText}>
                            Tap the button to run the asynchronous Thunk middleware operation.
                        </Text>
                    )}
                </View>
            </View>
        </View>
    )
}

// --- 3. Wrapped Export ---

export default function ReduxThunkExample() {
    return (
        <Provider store={localStore}>
            <ThunkUI />
        </Provider>
    )
}
