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
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    savedTokenText: {
        fontSize: FontSize.sm + 1,
        fontFamily: FontFamily.semiBold,
        color: Colors.secondary,
        marginVertical: Spacing.md,
        textAlign: 'center',
        paddingHorizontal: Spacing.sm,
    },
    italic: {
        fontStyle: 'italic',
        color: Colors.textMuted,
    },
    spinner: {
        marginVertical: Spacing.md,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.sm,
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
    btnSave: {
        backgroundColor: Colors.secondary,
        paddingVertical: Spacing.sm + 2,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
        justifyContent: 'center',
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
    inputLabel: {
        fontSize: FontSize.sm,
        fontFamily: FontFamily.medium,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    inputRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        fontSize: FontSize.sm,
        fontFamily: FontFamily.regular,
        backgroundColor: Colors.background,
    },
})
