import { Link } from 'expo-router'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Alert,
    ScrollView,
    Switch
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import useStore from '@/store'
import { CustomText, Icon } from '@/components'
import { showAlert } from '@/notification'

export default function SettingsScreen() {
    const { clearAllData } = useStore()
    const { colors } = useTheme()
    const { t } = useTranslation()
    const handleClearAllData = () => {
        showAlert('clear_data', clearAllData)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>{t('general')}</CustomText>

                <TouchableOpacity style={styles.item}>
                    <Icon name="Globe" size={20} color={colors.primary} />
                    <CustomText style={styles.itemText}>{t('language')}</CustomText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Icon name="Moon" size={20} color={colors.primary} />
                    <CustomText style={styles.itemText}>{t('dark mode')}</CustomText>
                    <Switch value={false} />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>{t('data')}</CustomText>

                <TouchableOpacity style={styles.item} >
                    <Icon name="CircleHelp" size={20} color={colors.primary} />
                    <CustomText style={styles.itemText}>{t('help')}</CustomText>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.item} onPress={handleClearAllData}>
                    <Icon name="Trash2" size={20} color={colors.error} />
                    <CustomText style={[styles.itemText, { color: colors.error }]}>{t('clear all data')}</CustomText>
                </TouchableOpacity>

            </View>

            <Link href="/" asChild>
                <TouchableOpacity style={styles.link}>
                    <CustomText style={styles.linkText}>{t('logout')}</CustomText>
                </TouchableOpacity>
            </Link>
            <Link href="/" asChild>
                <TouchableOpacity style={styles.link}>
                    <CustomText style={styles.linkText}>{t('login')}</CustomText>
                </TouchableOpacity>
            </Link>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        marginBottom: 10,
        backgroundColor: '#f8fafc',
        padding: 8,
        borderRadius: 12
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1e293b',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
    },
    itemText: {
        fontSize: 15,
        flex: 1,
        color: '#0f172a',
        fontWeight: '500',
    },
    link: {
        marginTop: 10,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#3b82f6',
        alignItems: 'center',
    },
    linkText: {
        color: '#ffffff',
        fontWeight: '600',
    },
})