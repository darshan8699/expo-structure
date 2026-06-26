import { apiConfig } from './api.config'

export const apiClient = {
    baseURL: apiConfig.baseURL,

    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${apiConfig.baseURL}${endpoint}`)
        if (!response.ok) throw new Error(response.statusText)
        return response.json() as Promise<T>
    },

    post: async <T>(endpoint: string, body: unknown): Promise<T> => {
        const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (!response.ok) throw new Error(response.statusText)
        return response.json() as Promise<T>
    },
}
