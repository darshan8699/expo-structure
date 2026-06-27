export interface DevToolsLog {
    time: string
    type: 'log' | 'warn' | 'error' | 'network'
    message: string
}
