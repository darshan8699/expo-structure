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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    statusLabel: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.medium,
        color: Colors.text,
    },
    fetching: {
        color: Colors.secondary,
        fontFamily: FontFamily.bold,
    },
    idle: {
        color: Colors.success,
        fontFamily: FontFamily.bold,
    },
    btnSmall: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.xs,
        paddingHorizontal: Spacing.sm,
        borderRadius: BorderRadius.sm,
    },
    btnSmallText: {
        color: '#fff',
        fontSize: FontSize.xs,
        fontFamily: FontFamily.semiBold,
    },
    loadingWrapper: {
        paddingVertical: Spacing.xl,
        alignItems: 'center',
    },
    errorWrapper: {
        padding: Spacing.md,
        backgroundColor: '#FEE2E2',
        borderRadius: BorderRadius.md,
    },
    errorText: {
        color: Colors.error,
        fontFamily: FontFamily.medium,
    },
    postsList: {
        maxHeight: 250,
    },
    postItem: {
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    postTitle: {
        fontSize: FontSize.sm + 1,
        fontFamily: FontFamily.bold,
        color: Colors.text,
        textTransform: 'capitalize',
        marginBottom: Spacing.xs - 2,
    },
    postBody: {
        fontSize: FontSize.xs + 1,
        fontFamily: FontFamily.regular,
        color: Colors.textMuted,
        lineHeight: 16,
    },
    infoTitle: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.bold,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    infoDesc: {
        fontSize: FontSize.xs + 1,
        fontFamily: FontFamily.regular,
        color: Colors.textMuted,
        lineHeight: 18,
    },
    infoText: {
        marginTop: Spacing.sm,
        fontSize: FontSize.xs + 1,
        fontFamily: FontFamily.medium,
        color: Colors.primary,
    },
})
