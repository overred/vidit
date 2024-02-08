export type Pattern = 'light' | 'medium' | 'heavy'

export const useHaptic = () => {
    return (pattern?: Pattern) => {
        if ('vibrate' in navigator) {
            navigator.vibrate({
                'light': [10],
                'medium': [25],
                'heavy': [50],
            }[pattern ?? 'light'])
        }
    }
}

const haptic = useHaptic()
export default haptic 