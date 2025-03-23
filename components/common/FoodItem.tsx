import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { CustomText, Icon } from '@/components'

type FoodItemProps =
    {
        isSample?: boolean
        isStatistic?: boolean
        name: string
        carbsWeight: number
        proteinsWeight: number
        fatsWeight: number
        calories: number
        time?: string
        type?: string
    }

export function FoodItem({
    isSample = false,
    isStatistic = false,
    type,
    name,
    carbsWeight,
    proteinsWeight,
    fatsWeight,
    calories,
    time
}: FoodItemProps) {
    const { colors } = useTheme()
    return (
        <View style={{ borderColor: '#e2e8f0' }} className='flex-row items-center justify-between p-4 border-b w-full'>
            <View className='flex flex-row gap-2 items-center text-slate-700'>
                <View>
                    <CustomText style={{ fontSize: 15, fontWeight: 600, color: colors.primary }}>{name}</CustomText>
                    <View className='flex flex-row items-center gap-1'>
                        <CustomText style={{ fontSize: 12, fontWeight: 500 }}>{carbsWeight}g - </CustomText>
                        <CustomText style={{ fontSize: 12, fontWeight: 500 }}>{proteinsWeight}g - </CustomText>
                        <CustomText style={{ fontSize: 12, fontWeight: 500 }}>{fatsWeight}g</CustomText>
                    </View>
                </View>
            </View>
            <CustomText style={{ fontSize: 15, fontWeight: 600, color: colors.primary }}>{time ? new Date(time).toLocaleTimeString() : ''}</CustomText>
            <View className='flex flex-row gap-1'>
                <Text style={{ fontSize: 15, fontWeight: 600, color: colors.primary }}>{calories}</Text>
                <Icon name={'Flame'} size={20} color={colors.primary} />
                {(isSample || isStatistic) && <Icon name='ChevronRight' size={20} color={colors.primary} />}
            </View>
        </View>
    )
}