import { useState } from 'react'
import { Text, TouchableOpacity, View, ScrollView, TextInput, Alert } from 'react-native'
import { PieChart } from "react-native-gifted-charts"
import { useForm, Controller } from "react-hook-form"
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'

import {
  CustomModal,
  CustomText,
  Icon
} from '@/components'
import WelcomeScreen from '@/app/welcome'
import useStore from '@/store'
import { FoodTypes } from '@/lib/constants/FoodTypes'
import { FoodItemType } from '@/lib/types'
import { showToast } from '@/notification'


const foodTypes = Object.entries(FoodTypes).map(([key, value]) => ({
  label: value.name,
  value: key,
}))

const levels = [
  { label: 'Giảm Chậm: 0,25kg/tuần', value: 0, caloriesChange: -250 },
  { label: 'Trung bình: 0,5kg/tuần', value: 1, caloriesChange: -500 },
  { label: 'Nhanh: 0,75kg/tuần', value: 2, caloriesChange: -750 },
  { label: 'Tăng cân: 0,25kg/tuần', value: 3, caloriesChange: 250 },
  { label: 'Tăng cân: 0,5kg/tuần', value: 4, caloriesChange: 500 },
  { label: 'Tăng cân: 1kg/tuần', value: 5, caloriesChange: 1000 },
];

const nutritionData = [
  { day: '9', type: 'T2' },
  { day: '10', type: 'T3' },
  { day: '11', type: 'T4' },
  { day: '12', type: 'T5', selected: true },
  { day: '13', type: 'T6' },
  { day: '14', type: 'T7' },
  { day: '15', type: 'CN' },
  { day: '16', type: 'T2' },
  { day: '17', type: 'T3' },
  { day: '18', type: 'T4' },
]

export default function HomeScreen() {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { bmr, tdde, todayCalories } = useStore()
  const [level, setLevel] = useState(0)
  const goal = tdde ? tdde + levels[level].caloriesChange : 0
  const pieData = [
    { value: todayCalories, color: '#177AD5' },
    { value: goal - todayCalories, color: 'lightgray' }
  ]
  const [modalVisible, setModalVisible] = useState(false)



  return (
    <View className='flex-1 relative px-4'>
      <ScrollView>
        {bmr ?
          <View className='flex-1 mb-2 relative w-full'>
            <CustomText className='text-2xl font-semibold my-4'>{t('your calories consumption today')}</CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-1 w-full mb-4'>
              <View className="flex-row justify-center items-center space-x-3">
                {nutritionData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ backgroundColor: item.selected ? colors.primary : colors.background }}
                    className="rounded-full px-4 py-2 items-center"
                  >
                    <CustomText style={{ color: item.selected ? colors.onPrimary : colors.outline }} className={
                      item.selected 
                      ? "text-sm font-semibold text-center" 
                      : "text-base font-semibold text-center"
                    }>
                      {item.day}
                    </CustomText>
                    <Text className={
                      item.selected 
                      ? "text-white text-xs text-center" 
                      : "text-gray-400 text-xs text-center"
                    }>
                      {item.type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View className='flex flex-row items-center justify-center gap-8 w-full'>
              <PieChart
                donut
                radius={80}
                innerRadius={65}
                data={pieData}
                showGradient
                centerLabelComponent={() => {
                  return <View className='flex flex-row items-center'>
                    <CustomText style={{ fontSize: 20, color: '#0284c7', fontWeight: 600 }}>
                      {todayCalories.toFixed(0)}
                    </CustomText>
                  </View>
                }}
              />
              <View className='flex-1 w-full border border-slate-300 rounded-3xl p-4 justify-center flex flex-col gap-2'>
                <View className='flex flex-row gap-2 items-center text-slate-700'>
                  <Icon name="Plus" size={25} color="#0284c7" />
                  <View>
                    <Text style={{ fontSize: 13, fontWeight: 600 }} className='text-sky-600'>{t('goal')}</Text>
                    <Text style={{ fontSize: 10, fontWeight: 500, color: '#555' }}>
                      {goal.toFixed(0)} calories
                    </Text>
                  </View>
                </View>
                <View className='flex flex-row gap-2 items-center text-slate-700'>
                  <Icon name="Plus" size={25} color="#0284c7" />
                  <View>
                    <Text style={{ fontSize: 13, fontWeight: 600 }} className='text-sky-600'>Cần thiết</Text>
                    <Text style={{ fontSize: 10, fontWeight: 500, color: '#555' }}>{tdde?.toFixed(0)} calories</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          : <WelcomeScreen />
        }
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 right-5 bg-blue-500 p-4 rounded-full shadow-lg"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
        onPress={() => { }}
      >
        <Icon name="Plus" size={25} color={colors.onPrimary} />
      </TouchableOpacity>
    </View>
  )
}

