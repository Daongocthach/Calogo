import { useState } from 'react'
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native'
import { PieChart } from "react-native-gifted-charts"
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'

import {
  CustomText,
  DateSelector,
  Icon
} from '@/components'
import useStore from '@/store'
import CalorieCards from '@/components/common/CalorieCards'

const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

export default function HomeScreen() {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { tdde, todayCalories } = useStore()
  const goal = tdde || 2042

  const pieData = [
    { value: 500, color: '#a3e635' },
    { value: Math.max(goal - todayCalories, 0), color: '#e5e7eb' }
  ]

  return (
    <View className='flex-1 relative px-4 py-2'>
      <DateSelector />
      <ScrollView>
        <View className='items-center px-1 mt-6'>
          <LinearGradient
            colors={[colors.primaryContainer, colors.primary]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }} style={[styles.containerShadow]}>
            <PieChart
              donut
              radius={70}
              innerRadius={62}
              data={pieData}
              showGradient
              centerLabelComponent={() => (
                <View className='items-center'>
                  <CustomText className='text-base font-semibold' style={{ color: colors.onSurfaceVariant }}>{t('necessary')}</CustomText>
                  <CustomText className='text-2xl font-bold' style={{ color: "#a3e635" }}>
                    {goal}
                  </CustomText>
                </View>
              )}
            />
          </LinearGradient>
          <CalorieCards goal={goal} />
        </View>

        {/* Nutrition Cards */}
        <View className='mt-6 flex flex-col gap-4'>
          <View className='flex-row items-center bg-red-50 rounded-3xl px-4 py-8'>
            <CustomText className='text-3xl mr-4'>🥩</CustomText>
            <View>
              <CustomText className='text-base font-semibold'>{t('protein')}</CustomText>
              <CustomText className='text-gray-600'>25g • <Text className='text-blue-700 font-semibold'>180 kcal</Text></CustomText>
            </View>
          </View>

          <View className='flex-row items-center bg-yellow-50 rounded-3xl px-4 py-8'>
            <CustomText className='text-3xl mr-4'>🍞</CustomText>
            <View>
              <CustomText className='text-base font-semibold'>{t('carbs')}</CustomText>
              <CustomText className='text-gray-600'>40g • <Text className='text-blue-700 font-semibold'>180 kcal</Text></CustomText>
            </View>
          </View>

          <View className='flex-row items-center bg-green-50 rounded-3xl px-4 py-8'>
            <CustomText className='text-3xl mr-4'>🥑</CustomText>
            <View>
              <CustomText className='text-base font-semibold'>{t('fat')}</CustomText>
              <CustomText className='text-gray-600'>20g • <Text className='text-blue-700 font-semibold'>180 kcal</Text></CustomText>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        className='absolute bottom-5 right-5 bg-blue-500 p-4 rounded-full shadow-lg'
        style={{ elevation: 5 }}
        onPress={() => { }}
      >
        <Icon name='Plus' size={25} color={colors.onPrimary} />
      </TouchableOpacity>
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
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    padding: 10,
  },
});