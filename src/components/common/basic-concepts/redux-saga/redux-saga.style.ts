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
    },
    btnPrimary: {
        backgroundColor: Colors.secondary,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    btnDisabled: {
        backgroundColor: Colors.border,
    },
    btnText: {
        color: '#fff',
        fontFamily: FontFamily.bold,
        fontSize: FontSize.md,
    },
    detailsContainer: {
        marginTop: Spacing.lg,
        minHeight: 180,
        justifyContent: 'center',
    },
    loadingWrapper: {
        alignItems: 'center',
        gap: Spacing.sm,
    },
    statusText: {
        fontFamily: FontFamily.medium,
        color: Colors.secondary,
        fontSize: FontSize.xs + 1,
        textAlign: 'center',
    },
    errorWrapper: {
        backgroundColor: '#FEE2E2',
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    errorText: {
        fontFamily: FontFamily.medium,
        color: Colors.error,
        fontSize: FontSize.sm,
    },
    todoCard: {
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.background,
    },
    todoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    todoId: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.bold,
        color: Colors.textMuted,
    },
    badge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs - 2,
        borderRadius: BorderRadius.full,
    },
    badgeCompleted: {
        backgroundColor: '#DCFCE7',
    },
    badgePending: {
        backgroundColor: '#FEF3C7',
    },
    badgeText: {
        fontSize: FontSize.xs,
        fontFamily: FontFamily.semiBold,
        color: Colors.text,
    },
    todoTitle: {
        fontSize: FontSize.md,
        fontFamily: FontFamily.semiBold,
        color: Colors.text,
        lineHeight: 22,
        marginVertical: Spacing.sm,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.sm,
    },
    infoText: {
        fontSize: FontSize.xs,
        fontFamily: FontFamily.regular,
        color: Colors.textMuted,
        lineHeight: 16,
    },
    placeholderText: {
        textAlign: 'center',
        color: Colors.textMuted,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.sm,
        lineHeight: 20,
    },
})
