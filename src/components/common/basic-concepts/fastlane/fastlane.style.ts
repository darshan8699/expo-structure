import { StyleSheet } from 'react-native'
import { Colors, BorderRadius, FontFamily, FontSize, Spacing } from '@/common/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.md,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: FontSize.xl,
        fontFamily: FontFamily.bold,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.regular,
        color: Colors.textMuted,
        marginBottom: Spacing.lg,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.bold,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    platformRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.md,
    },
    platformBtn: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: Colors.border,
        paddingVertical: Spacing.sm + 2,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    platformBtnActive: {
        borderColor: Colors.primary,
        backgroundColor: '#EEF2FF',
    },
    platformText: {
        fontFamily: FontFamily.semiBold,
        fontSize: FontSize.sm,
        color: Colors.textMuted,
    },
    platformTextActive: {
        color: Colors.primary,
    },
    btnRun: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    btnDisabled: {
        opacity: 0.6,
    },
    btnRunText: {
        color: '#fff',
        fontFamily: FontFamily.bold,
        fontSize: FontSize.md,
    },
    terminalContainer: {
        backgroundColor: '#1E1E1E',
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
        flex: 1,
        maxHeight: 300,
    },
    terminalHeader: {
        backgroundColor: '#323232',
        paddingVertical: Spacing.xs + 2,
        paddingHorizontal: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dotsRow: {
        flexDirection: 'row',
        gap: 6,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    terminalTitle: {
        color: '#9E9E9E',
        fontSize: FontSize.xs,
        fontFamily: FontFamily.medium,
        marginLeft: Spacing.md,
    },
    terminalBody: {
        flex: 1,
    },
    terminalContent: {
        padding: Spacing.md,
    },
    terminalTextLine: {
        color: '#D4D4D4',
        fontFamily: 'Courier',
        fontSize: FontSize.xs,
        lineHeight: 18,
        marginVertical: 2,
    },
    terminalPrompt: {
        color: Colors.success,
        fontFamily: 'Courier',
        fontWeight: 'bold',
    },
    terminalLoader: {
        alignSelf: 'flex-start',
        marginTop: Spacing.xs,
    },
    progressBarContainer: {
        height: 4,
        backgroundColor: '#323232',
        width: '100%',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.success,
    },
})
