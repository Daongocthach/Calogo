import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme, List } from 'react-native-paper'
import { useRouter } from 'expo-router'

import CustomText from '@/components/common/CustomText'
import Icon from '@/components/common/Icon'
import { useTranslation } from 'react-i18next'
import { FoodProps } from '@/lib'
import useStore from '@/store'

export function FoodItem(item: FoodProps) {
    const router = useRouter()
    const { colors } = useTheme()
    const { t } = useTranslation()
    const { deleteFood } = useStore()
    const [expanded, setExpanded] = useState(false)
    const FoodAccordionTitle = ({ item }: { item: FoodProps }) => (
        <View className='flex-row items-center justify-between w-full'>
            <View className='flex flex-row items-center'>
                <CustomText className='text-3xl mr-4'>
                    {item?.food_type?.icon || '🥩'}
                </CustomText>
                <View>
                    <CustomText className='text-base font-semibold'>
                        {item?.name || 'N/A'}
                    </CustomText>
                    <CustomText className='text-gray-600'>
                        {'100g'} - {item?.calorie} kcals
                    </CustomText>
                </View>
            </View>
        </View>
    )
    return (
        <View style={[styles.containerShadow, { backgroundColor: '#fff', borderRadius: 12, padding: 4 }]}>
            <List.Accordion
                title={<FoodAccordionTitle item={item} />}
                expanded={expanded}
                style={{ borderRadius: 12 }}
                onPress={() => setExpanded(!expanded)}
            >
                <View
                    className='flex flex-row items-center justify-between p-4 rounded-lg'
                    style={{ borderTopWidth: 1, borderTopColor: colors.surfaceDisabled }}
                >
                    <View>
                        <CustomText className='text-base font-semibold' style={{ color: colors.tertiary }} >
                            {item?.food_type?.name}
                        </CustomText>
                        <CustomText className='font-medium mt-2' style={{ color: colors.onSurfaceDisabled }}>
                            {t('protein')}: {item?.protein_weight}g
                        </CustomText>
                        <CustomText className='font-medium' style={{ color: colors.onSurfaceDisabled }}>
                            {t('carbs')}: {item?.carb_weight}g
                        </CustomText>
                        <CustomText className='font-medium' style={{ color: colors.onSurfaceDisabled }}>
                            {t('fat')}: {item?.fat_weight}g
                        </CustomText>
                    </View>
                    <View className='flex flex-col gap-4 mr-4'>
                        <TouchableOpacity onPress={() => router.push(`/add-food?id=${item.id}`)}>
                            <Icon name="Pencil" size={18} color={colors.onSurfaceDisabled} />
                        </TouchableOpacity>
                        <TouchableOpacity className='mt-2' onPress={() => deleteFood(item.id)}>
                            <Icon name="Trash" size={18} color={colors.onSurfaceDisabled} />
                        </TouchableOpacity>
                    </View>
                </View>
            </List.Accordion>
        </View>
    )
}

const styles = StyleSheet.create({
    containerShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        marginTop: 10,
        marginBottom: 2,
    },
})
