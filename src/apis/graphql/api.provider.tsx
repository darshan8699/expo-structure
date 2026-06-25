import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './graphql.client'

interface ApiProviderProps {
    children: React.ReactNode
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
