async function promiseChain<T>(callbacks: (() => Promise<T>)[]) {
    const output: T[] = []
    for (const callback of callbacks) {
        const result = await callback()
        output.push(result)
    }
    return output
}

const safePromise = async (callback: any) => {
    try {
        const res = await callback()
        return [null, res]
    } catch (error) {
        return [error, null]
    }
}

export { safePromise, promiseChain }
