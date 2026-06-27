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
    buttonRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    btnLog: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    btnWarn: {
        flex: 1,
        backgroundColor: '#FEF3C7',
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F59E0B',
    },
    btnError: {
        flex: 1,
        backgroundColor: Colors.error,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    btnNetwork: {
        flex: 1.5,
        backgroundColor: Colors.secondary,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    btnToggle: {
        flex: 1,
        backgroundColor: Colors.primary,
        opacity: 0.7,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    btnActive: {
        opacity: 1,
        backgroundColor: Colors.success,
    },
    btnText: {
        color: Colors.text,
        fontFamily: FontFamily.semiBold,
        fontSize: FontSize.xs + 1,
    },
    btnTextPrimary: {
        color: '#fff',
        fontFamily: FontFamily.semiBold,
        fontSize: FontSize.xs + 1,
    },
    sectionHeader: {
        fontSize: FontSize.md,
        fontFamily: FontFamily.semiBold,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    logBox: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        borderRadius: BorderRadius.md,
        maxHeight: 250,
    },
    logContent: {
        padding: Spacing.md,
    },
    logLine: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: Spacing.xs - 2,
    },
    logTime: {
        color: '#7C7C7C',
        fontSize: FontSize.xs,
        fontFamily: FontFamily.regular,
        marginRight: Spacing.xs,
    },
    logMessage: {
        flex: 1,
        color: '#D4D4D4',
        fontSize: FontSize.xs,
        fontFamily: FontFamily.regular,
    },
    logWarn: {
        color: '#F59E0B',
    },
    logError: {
        color: '#EF4444',
    },
    logNetwork: {
        color: '#3B82F6',
    },
})
