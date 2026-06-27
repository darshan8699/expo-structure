export interface BuildStep {
    message: string
    delay: number
    type: 'info' | 'success' | 'warn'
}
