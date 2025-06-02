import { Image, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import IMAGES from '@/assets/images'
import CustomText from '@/components/common/CustomText'

export const CustomHeader = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const { colors } = useTheme()
    return (
        <SafeAreaView
            edges={['top']}
            className='flex flex-row justify-between items-center px-4 py-2'
            style={{ paddingBottom: 10, backgroundColor: colors.background }}
        >
            <TouchableOpacity onPress={() => { }} className='flex flex-row items-center justify-center gap-1'>
                <Image source={IMAGES.LOGO} style={{ width: 52, height: 52 }} resizeMode="contain" />
                <View className='mb-1'>
                    <CustomText
                    
                        className="text-2xl font-bold tracking-[4.5px]"
                    >
                        {t('calogo')}
                    </CustomText>
                    <CustomText className="text-xs font-bold uppercase tracking-[3px]">{t('healthy every day')}</CustomText>
                </View>
            </TouchableOpacity>
            <View className='flex flex-row items-center'>
                <DrawerToggleButton tintColor={colors.onBackground} />
            </View>
        </SafeAreaView>
    )
}


