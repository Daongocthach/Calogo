import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { PieChart } from "react-native-gifted-charts"
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'

import {
  CustomText,
  DateSelector,
} from '@/components'
import useStore from '@/store'
import CalorieCards from '@/components/common/CalorieCards'
import AddMealIcon from '@/components/common/AddMealIcon'
import { Redirect } from 'expo-router'


export default function HomeScreen() {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { tdee, todayCalories } = useStore()

  const pieData = [
    { value: 500, color: colors.tertiary },
    { value: Math.max(tdee || 0 - todayCalories, 0), color: colors.surfaceVariant }
  ]
  if (tdee === null) {
    return <Redirect href="/welcome" />
  }

  return (
    <View className='flex-1 relative px-4 pt-2 pb-4'>
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
                  <CustomText className='text-3xl'>🍀</CustomText>
                  <Text className='text-base font-semibold text-lime-500'>{t('necessary')}</Text>
                  <Text className='text-2xl font-bold text-lime-500 '>
                    {tdee}
                  </Text>
                </View>
              )}
            />
          </LinearGradient>
          <CalorieCards loaded={todayCalories} exeeded={0}/>
        </View>

        {/* Nutrition Cards */}
        <View className='mt-6 flex flex-col gap-4'>
          <View className='flex-row items-center rounded-3xl px-4 py-8' style={{ backgroundColor: colors.errorContainer }}>
            <CustomText className='text-3xl mr-4'>🥩</CustomText>
            <View>
              <Text className='text-base font-semibold'>{t('protein')}</Text>
              <Text className='text-gray-600'>25g • <Text className='text-blue-700 font-semibold'>180 kcal</Text></Text>
            </View>
          </View>

          <View className='flex-row items-center rounded-3xl px-4 py-8' style={{ backgroundColor: colors.secondaryContainer }}>
            <CustomText className='text-3xl mr-4'>🍞</CustomText>
            <View>
              <Text className='text-base font-semibold'>{t('carbs')}</Text>
              <Text className='text-gray-600'>40g • <Text className='text-blue-700 font-semibold'>180 kcal</Text></Text>
            </View>
          </View>

          <View className='flex-row items-center rounded-3xl px-4 py-8' style={{ backgroundColor: colors.tertiaryContainer }}>
            <CustomText className='text-3xl mr-4'>🥑</CustomText>
            <View>
              <Text className='text-base font-semibold'>{t('fat')}</Text>
              <Text className='text-gray-600'>20g • <Text className='text-blue-700 font-semibold'>180 kcal</Text></Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <AddMealIcon />
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
    borderRadius: 20,
    flex: 1,
    padding: 10,
  },
});