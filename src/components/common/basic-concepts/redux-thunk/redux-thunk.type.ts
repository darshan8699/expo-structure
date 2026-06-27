export interface User {
    id: number
    name: string
    username: string
    email: string
    company: { name: string }
}

export interface ThunkState {
    user: User | null
    loading: boolean
    error: string | null
}
