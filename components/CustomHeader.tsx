import { IconSymbol } from '@/components/ui/IconSymbol'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const CustomHeader = () => {
    return (
        <SafeAreaView className='flex flex-row justify-between px-4'>
            <TouchableOpacity
                className='flex flex-row items-center justify-center gap-1'>
                <Image source={require('@/assets/images/logo.png')} style={{ width: 52, height: 52 }} resizeMode="contain" />
                <View className='mb-1'>
                    <Text style={{ fontSize: 18, letterSpacing: 4, color: '#374151'}} className="font-bold">calogo</Text>
                    <Text style={{ fontSize: 12, letterSpacing: 1, color: '#374151' }} className="font-bold uppercase">Try Better</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                className='flex flex-row items-center justify-center gap-1'>
                <IconSymbol name='bell.badge.slash' size={24} color='black' />
            </TouchableOpacity>
        </SafeAreaView>
    )
}


