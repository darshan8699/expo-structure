import { useEffect, useRef } from 'react'

/**
 * Custom hook that runs the provided callback only once, with optional cleanup support.
 *
 * @param effect - A function to execute once on mount. Can optionally return a cleanup function.
 */
const useEffectOnce = (effect: () => void | (() => void)): void => {
    const hasRun = useRef(false)

    useEffect(() => {
        let cleanup: void | (() => void)

        if (!hasRun.current) {
            hasRun.current = true
            cleanup = effect() // Capture the cleanup function if returned
        }

        return () => {
            if (typeof cleanup === 'function') cleanup()
        }
    }, [effect])
}

export default useEffectOnce
