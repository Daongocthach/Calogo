import { IconSymbol } from '@/components/ui/IconSymbol'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const CustomHeader = () => {
    
    return (
        <SafeAreaView className='flex flex-row justify-between px-4'>
            <TouchableOpacity>
                <Image
                    source={require('@/assets/images/logo-header.png')}
                    style={{ width: 250, height: 100 }} resizeMode="contain"
                />
            </TouchableOpacity>
            <TouchableOpacity
                className='flex flex-row items-center justify-center gap-1'>
                <IconSymbol name='translate' size={20} color='#333' />
            </TouchableOpacity>
        </SafeAreaView>
    )
}


