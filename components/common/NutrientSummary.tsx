import { View, Text, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'

export default function NutrientSummary() {
    const { t } = useTranslation()
    const { colors } = useTheme()

    const items = [
        { label: t('protein'), value: '25g', bgColor: colors.errorContainer, icon: '🥩' }, 
        { label: t('carbs'), value: '60g', bgColor: colors.secondaryContainer, icon: '🍚' },
        { label: t('fat'), value: '30g', bgColor: colors.tertiaryContainer, icon: '🥑' },
        { label: t('total calories'), value: '800', bgColor: colors.primaryContainer, icon: '🍔' },
    ]

    return (
        <View style={styles.cardContainer}>
            {items.map((item, index) => (
                <View key={index} style={styles.item}>
                    <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
                        <Text style={{ fontSize: 24, height: 32 }}>{item.icon}</Text>
                    </View>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.value}>{item.value}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        marginTop: 8
    },
    item: {
        alignItems: 'center',
        flex: 1,
        gap: 4,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 12,
        color: '#374151',
    },
    value: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    }
})
