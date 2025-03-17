import { Image, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { useTheme } from 'react-native-paper'

import MenuTranslate from '@/components/common/MenuTranslate'

export const CustomHeader = () => {
    const router = useRouter()
    const { colors } = useTheme()
    return (
        <SafeAreaView className='flex flex-row justify-between items-center px-4' style={{ paddingBottom: 10 }}>
            <TouchableOpacity onPress={() => { router.push('/') }}>
                <Image
                    source={require('@/assets/images/logo-header.png')}
                    style={{ width: 250, height: 75 }} resizeMode="contain"
                />
            </TouchableOpacity>
            <View className='flex flex-row items-center'>
                <MenuTranslate />
                <DrawerToggleButton tintColor={colors.primary}/>
            </View>
        </SafeAreaView>
    )
}


