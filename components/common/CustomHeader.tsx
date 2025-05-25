import { Image, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { useTheme } from 'react-native-paper'

export const CustomHeader = () => {
    const router = useRouter()
    const { colors } = useTheme()
    return (
        <SafeAreaView
            edges={['top']}
            className='flex flex-row justify-between items-center px-4 py-2'
            style={{ paddingBottom: 10, backgroundColor: colors.background }}
        >
            <TouchableOpacity onPress={() => { router.push('/') }}>
                <Image
                    source={require('@/assets/images/logo-header.png')}
                    style={{ width: 250, height: 75 }} resizeMode="contain"
                />
            </TouchableOpacity>
            <View className='flex flex-row items-center'>
                <DrawerToggleButton tintColor={colors.onBackground} />
            </View>
        </SafeAreaView>
    )
}


