import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme, List } from 'react-native-paper'

import { CustomText, Icon } from '@/components'
import { useTranslation } from 'react-i18next'

type FoodItemProps = {
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
    const [expanded, setExpanded] = useState(false)

    return (
        <List.Accordion
            title={
                <View className='flex-row items-center justify-between py-4 w-full'>
                    <View className='flex flex-row items-center'>
                        <CustomText className='text-3xl mr-4'>🥩</CustomText>
                        <View>
                            <CustomText className='text-base font-semibold'>{name}</CustomText>
                            <CustomText className='text-gray-600'>{calories} kcals</CustomText>
                        </View>
                    </View>

                </View>
            }
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
            style={[styles.containerShadow, { backgroundColor: '#fff', borderRadius: 20 }]}
            titleStyle={{ padding: 0 }}
        >
            <View
                className='flex flex-row items-center justify-between px-4'
                style={{ backgroundColor: colors.surface, borderRadius: 20, padding: 10, marginBottom: 10 }}
            >
                <View className=''>
                    <CustomText className='text-gray-600 font-medium'>{
                        t('protein')}: {proteinsWeight}g
                    </CustomText>
                    <CustomText className='text-gray-600 font-semibold'>
                        {t('carbs')}: {carbsWeight}g
                    </CustomText>
                    <CustomText className='text-gray-600 font-semibold'>
                        {t('fat')}: {fatsWeight}g
                    </CustomText>
                </View>
                <View className='flex-row gap-4'>
                    <TouchableOpacity>
                        <Icon name="Pencil" size={16} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="Trash" size={16} color={colors.onSurfaceVariant} />
                    </TouchableOpacity>
                </View>
            </View>
        </List.Accordion>
    )
}

const styles = StyleSheet.create({
    containerShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 16,
    },
})
