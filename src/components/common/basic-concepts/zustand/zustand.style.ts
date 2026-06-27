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
        fontFamily: FontFamily.medium,
        color: Colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center',
    },
    counterText: {
        fontSize: FontSize.display,
        fontFamily: FontFamily.bold,
        color: Colors.primary,
        marginVertical: Spacing.md,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
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
        backgroundColor: Colors.border,
        paddingVertical: Spacing.sm + 4,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    btnText: {
        color: Colors.text,
        fontFamily: FontFamily.semiBold,
        fontSize: FontSize.sm,
    },
    btnTextPrimary: {
        color: '#fff',
        fontFamily: FontFamily.semiBold,
        fontSize: FontSize.sm,
    },
    tipTitle: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.bold,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    tipText: {
        fontSize: FontSize.xs + 1,
        fontFamily: FontFamily.regular,
        color: Colors.textMuted,
        lineHeight: 18,
    },
})
