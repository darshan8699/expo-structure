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
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: Spacing.lg,
    },
    label: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.medium,
        color: Colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    counterText: {
        fontSize: FontSize.display,
        fontFamily: FontFamily.bold,
        color: Colors.primary,
        marginVertical: Spacing.md,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginTop: Spacing.sm,
    },
    btnPrimary: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.sm + 4,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    btnSecondary: {
        backgroundColor: Colors.secondary,
        paddingVertical: Spacing.sm + 4,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    btnDanger: {
        backgroundColor: Colors.error,
        paddingVertical: Spacing.sm + 4,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    btnText: {
        color: '#fff',
        fontFamily: FontFamily.semiBold,
        fontSize: FontSize.sm,
    },
    sectionHeader: {
        fontSize: FontSize.md,
        fontFamily: FontFamily.semiBold,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    logContainer: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        maxHeight: 250,
    },
    logContent: {
        padding: Spacing.sm,
    },
    logItem: {
        paddingVertical: Spacing.xs,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    logText: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs + 1,
        color: Colors.textMuted,
    },
})
