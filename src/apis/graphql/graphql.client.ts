import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { apiConfig } from './api.config'

const httpLink = createHttpLink({
    uri: apiConfig.graphQlApiUri,
})

// Middleware to inject authentication token
const authLink = setContext(async (_, { headers }) => {
    // TODO: Retrieve your token from storage (e.g. AsyncStorage or SecureStore)
    const token = null

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})
