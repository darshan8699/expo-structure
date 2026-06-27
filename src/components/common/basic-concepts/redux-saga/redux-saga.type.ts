export interface Todo {
    id: number
    title: string
    completed: boolean
}

export interface SagaState {
    todo: Todo | null
    loading: boolean
    error: string | null
}
