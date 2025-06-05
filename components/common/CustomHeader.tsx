import { Image, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import IMAGES from '@/assets/images'
import CustomText from '@/components/common/CustomText'
import useStore from '@/store'

export const CustomHeader = () => {
    const { darkMode } = useStore()
    const { t } = useTranslation()
    const router = useRouter()
    const { colors } = useTheme()
    return (
        <SafeAreaView
            edges={['top']}
            className='flex flex-row justify-between items-center px-4 py-2'
            style={{ paddingBottom: 10, backgroundColor: colors.background }}
        >

            :
            <TouchableOpacity onPress={() => { router.push('/') }}>
                {darkMode ?
                    <Image
                        source={IMAGES.LOGO_HEADER_DARK}
                        style={{ width: 200, height: 75 }} resizeMode="contain"
                    />
                    :
                    <Image
                        source={IMAGES.LOGO_HEADER_LIGHT}
                        style={{ width: 200, height: 75 }} resizeMode="contain"
                    />
                }

            </TouchableOpacity>

            <View className='flex flex-row items-center'>
                <DrawerToggleButton tintColor={colors.onBackground} />
            </View>
        </SafeAreaView>
    )
}


