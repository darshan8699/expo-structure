async function promiseChain<T>(callbacks: (() => Promise<T>)[]) {
    const output: T[] = []
    for (const callback of callbacks) {
        const result = await callback()
        output.push(result)
    }
    return output
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const safePromise = async (callback: any) => {
    try {
        const res = await callback()
        return [null, res]
    } catch (error) {
        return [error, null]
    }
}

export { safePromise, promiseChain }
