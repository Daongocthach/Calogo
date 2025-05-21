import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { PieChart } from "react-native-gifted-charts"
import { useTheme, Checkbox } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import useStore from '@/store'
import SearchInput from '@/components/common/SearchInput'
import { FoodItem } from '@/components/common/FoodItem'
import CustomText from '@/components/common/CustomText'
import { FoodProps, windowHeight } from '@/lib'
import AddMealIcon from '@/components/common/AddMealIcon'
import Icon from '@/components/common/Icon'

function ManualTab() {
    const { foodList } = useStore()
    const { colors } = useTheme()
    const { t } = useTranslation()
    const { tdee, todayCalories, foodTypes } = useStore()
    const goal = tdee || 2042

    const pieData = [
        { value: 500, color: colors.primary },
        { value: Math.max(goal - todayCalories, 0), color: colors.outlineVariant }
    ]

    return (
        <View className='flex-1 relative'>
            <View className='items-center px-1 mt-6'>
                <PieChart
                    donut
                    radius={60}
                    innerRadius={52}
                    data={pieData}
                    showGradient
                    centerLabelComponent={() => (
                        <View className='items-center'>
                            <CustomText className='text-2xl font-bold' style={{ color: colors.primary }}>
                                {200}
                            </CustomText>
                        </View>
                    )}
                />
            </View>
            <SearchInput />
            <ScrollView className='px-1 pb-4' style={{ maxHeight: windowHeight - 350 }}>
                {Array.isArray(foodList) && foodList.map((item, index) => (
                    <View key={index} style={[styles.containerShadow, { backgroundColor: '#fff', borderRadius: 12, padding: 14 }]}>
                        <Checkbox status='checked' color={colors.primary} />
                        <View className='flex-row items-center justify-between w-full ml-2'>
                            <View className='flex flex-row items-center'>
                                <CustomText className='text-3xl mr-4'>
                                    {item?.food_type?.icon || '🥩'}
                                </CustomText>
                                <View>
                                    <CustomText className='text-base font-semibold'>
                                        {item?.name}
                                    </CustomText>
                                    <CustomText className='text-gray-600'>{'100g'} - {item?.calorie} kcals</CustomText>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                className="absolute right-5 bg-blue-500 p-4 rounded-full shadow-lg"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,
                    bottom: 80,
                }}
            >
                <Icon name="Plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default ManualTab

const styles = StyleSheet.create({
    containerShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        marginTop: 10,
        marginBottom: 2,
        flexDirection: 'row',
    },
})