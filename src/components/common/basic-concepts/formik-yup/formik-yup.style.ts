import { StyleSheet } from 'react-native'
import { Colors, BorderRadius, FontFamily, FontSize, Spacing } from '@/common/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.md,
        backgroundColor: Colors.background,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    title: {
        fontSize: FontSize.xl,
        fontFamily: FontFamily.bold,
        color: Colors.text,
    },
    badge: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs - 2,
        borderRadius: BorderRadius.full,
    },
    badgeText: {
        fontSize: FontSize.xs,
        fontFamily: FontFamily.bold,
        color: Colors.error,
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
    },
    label: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.medium,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm + 2,
        fontSize: FontSize.sm,
        fontFamily: FontFamily.regular,
        backgroundColor: Colors.background,
    },
    inputError: {
        borderColor: Colors.error,
        backgroundColor: '#FFF5F5',
    },
    errorText: {
        color: Colors.error,
        fontSize: FontSize.xs,
        fontFamily: FontFamily.medium,
        marginTop: Spacing.xs,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.md,
        paddingVertical: Spacing.xs,
    },
    switchLabel: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.medium,
        color: Colors.text,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: Spacing.sm,
        marginTop: Spacing.lg,
    },
    btnPrimary: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.sm + 2,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    btnSecondary: {
        backgroundColor: Colors.border,
        paddingVertical: Spacing.sm + 2,
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
})
