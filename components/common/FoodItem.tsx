import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import { CustomText, Icon } from '@/components'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()
    return (
        <View style={styles.containerShadow} className='flex-row items-center mb-4 py-4' >
            <CustomText className='text-3xl mr-4'>🥩</CustomText>
            <View>
                <CustomText className='text-base font-semibold'>{t('protein')}</CustomText>
                <CustomText className='text-gray-600'>25g • <Text className='text-blue-700 font-semibold'>180 kcal</Text></CustomText>
            </View>
        </View>
        // <View style={{ borderColor: '#e2e8f0' }} className='flex-row items-center justify-between p-4 border-b w-full'>
        //     <View className='flex flex-row gap-2 items-center text-slate-700'>
        //         <View>
        //             <CustomText style={{ fontSize: 15, fontWeight: 600, color: colors.primary }}>{name}</CustomText>
        //             <View className='flex flex-row items-center gap-1'>
        //                 <CustomText style={{ fontSize: 12, fontWeight: 500 }}>{carbsWeight}g - </CustomText>
        //                 <CustomText style={{ fontSize: 12, fontWeight: 500 }}>{proteinsWeight}g - </CustomText>
        //                 <CustomText style={{ fontSize: 12, fontWeight: 500 }}>{fatsWeight}g</CustomText>
        //             </View>
        //         </View>
        //     </View>
        //     <CustomText style={{ fontSize: 15, fontWeight: 600, color: colors.primary }}>{time ? new Date(time).toLocaleTimeString() : ''}</CustomText>
        //     <View className='flex flex-row gap-1'>
        //         <Text style={{ fontSize: 15, fontWeight: 600, color: colors.primary }}>{calories}</Text>
        //         <Icon name={'Flame'} size={20} color={colors.primary} />
        //         {(isSample || isStatistic) && <Icon name='ChevronRight' size={20} color={colors.primary} />}
        //     </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    containerShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        backgroundColor: '#fff',
        borderRadius: 20,
        flex: 1,
        padding: 10,
    },
});