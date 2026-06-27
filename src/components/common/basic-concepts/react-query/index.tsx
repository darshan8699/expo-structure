import React from 'react'
import { Text, View, Pressable, ActivityIndicator, ScrollView } from 'react-native'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Post } from './react-query.type'
import { styles } from './react-query.style'

// --- 1. React Query Instance ---
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000, // Caches are considered fresh for 5 seconds
        },
    },
})

// Fetch worker function
const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    if (!response.ok) {
        throw new Error('Server returned error status code')
    }
    return response.json() as Promise<Post[]>
}

// --- 2. Inner Component UI ---

function QueryPostsUI() {
    const {
        data: posts,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ['postsList'],
        queryFn: fetchPosts,
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TanStack Query Example</Text>
            <Text style={styles.subtitle}>
                Uses cache keys, loading/fetching states, and manual background refetches.
            </Text>

            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Text style={styles.statusLabel}>
                        Query State:{' '}
                        {isFetching ? (
                            <Text style={styles.fetching}>Fetching...</Text>
                        ) : (
                            <Text style={styles.idle}>Cached / Idle</Text>
                        )}
                    </Text>
                    <Pressable style={styles.btnSmall} onPress={() => refetch()}>
                        <Text style={styles.btnSmallText}>Refetch Data</Text>
                    </Pressable>
                </View>

                {isLoading && (
                    <View style={styles.loadingWrapper}>
                        <ActivityIndicator size="large" color={styles.btnSmall.backgroundColor} />
                        <Text style={styles.infoText}>Loading Posts (Cache Miss)...</Text>
                    </View>
                )}

                {isError && (
                    <View style={styles.errorWrapper}>
                        <Text style={styles.errorText}>Error fetching posts: {error?.message}</Text>
                    </View>
                )}

                {posts && (
                    <ScrollView style={styles.postsList}>
                        {posts.map((post) => (
                            <View key={post.id} style={styles.postItem}>
                                <Text style={styles.postTitle}>{post.title}</Text>
                                <Text style={styles.postBody}>{post.body}</Text>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>

            <View style={styles.card}>
                <Text style={styles.infoTitle}>💡 Caching mechanism:</Text>
                <Text style={styles.infoDesc}>
                    Click &quot;Refetch Data&quot;. Notice the loading screen does not freeze. React Query instantly
                    returns cached data while updating the query data in the background.
                </Text>
            </View>
        </View>
    )
}

// --- 3. Wrapped Export with QueryClientProvider ---

export default function ReactQueryExample() {
    return (
        <QueryClientProvider client={queryClient}>
            <QueryPostsUI />
        </QueryClientProvider>
    )
}
