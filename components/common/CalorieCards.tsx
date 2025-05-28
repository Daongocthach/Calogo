import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { CustomText, Icon } from '@/components'

export default function CalorieCards({ 
    loaded = 0,
    exeeded = 0
}: { 
    loaded: number,
    exeeded: number 
}) {
    const { colors } = useTheme()
    const { t } = useTranslation()

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.tertiaryContainer, colors.tertiary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.card, styles.rotateLeft]}
            >
                <Icon name="Beef" size={28} color={colors.onTertiary} />
                <CustomText style={styles.cardTitle}>{t('loaded')}</CustomText>
                <CustomText style={styles.cardValue}>{loaded} kcal</CustomText>
            </LinearGradient>

            <LinearGradient
                colors={[colors.error, colors.errorContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.card, styles.rotateRight]}
            >
                <Icon name="Ham" size={28} color={colors.onError} />
                <CustomText style={[styles.cardTitle, { color: colors.onError }]}>{t('exceeded')}</CustomText>
                <CustomText style={styles.cardValue}>{exeeded} kcal</CustomText>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    card: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    rotateLeft: {
        transform: [{ rotate: '-2deg' }],
        marginRight: 8,
    },
    rotateRight: {
        transform: [{ rotate: '2deg' }],
        marginLeft: 8,
    },
    cardTitle: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
        marginTop: 8,
    },
    cardValue: {
        color: '#ffffff',
        fontWeight: '800',
        fontSize: 18,
        marginTop: 4,
    },
})
