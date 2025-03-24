import { useState, useMemo } from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { PieChart } from "react-native-gifted-charts"
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'
import dayjs from 'dayjs'

import { Apple, BarChart, UtensilsCrossed } from 'lucide-react-native'

import {
  CustomText,
  Icon
} from '@/components'
import useStore from '@/store'


const levels = [
  { label: 'Giảm Chậm: 0,25kg/tuần', value: 0, caloriesChange: -250 },
  { label: 'Trung bình: 0,5kg/tuần', value: 1, caloriesChange: -500 },
  { label: 'Nhanh: 0,75kg/tuần', value: 2, caloriesChange: -750 },
  { label: 'Tăng cân: 0,25kg/tuần', value: 3, caloriesChange: 250 },
  { label: 'Tăng cân: 0,5kg/tuần', value: 4, caloriesChange: 500 },
  { label: 'Tăng cân: 1kg/tuần', value: 5, caloriesChange: 1000 },
];

const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

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
  const [today, setToday] = useState(new Date())

  const dateData = useMemo(() => {
    const result = []
    for (let i = -5; i <= 5; i++) {
      const date = dayjs(today).add(i, 'day')
      result.push({
        key: date.format('YYYY-MM-DD'),
        day: date.format('D'),
        type: weekdays[date.day()],
        selected: date.isSame(dayjs(today), 'day'),
        fullDate: date.toDate(),
      })
    }
    return result
  }, [today])

  return (
    <View className='flex-1 relative px-4'>
      <ScrollView>
        <View className='flex-1 mb-2 relative w-full'>
          <CustomText className='font-semibold my-6' style={{ fontSize: 18 }}>
            {t('your calories consumption today')}
          </CustomText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1 w-full mb-4">
            <View className="flex-row justify-center items-center gap-3">
              {dateData.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setToday(item.fullDate)}
                  style={{ backgroundColor: item.selected ? colors.primary : colors.background }}
                  className="rounded-full px-3 py-3 items-center"
                >
                  <CustomText
                    style={{ color: item.selected ? colors.onPrimary : colors.outline }}
                    className={
                      item.selected
                        ? 'text-sm font-semibold text-center'
                        : 'text-base font-semibold text-center'
                    }>
                    {item.day}
                  </CustomText>
                  <Text
                    className={
                      item.selected
                        ? 'text-white text-xs text-center'
                        : 'text-gray-400 text-xs text-center'
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
            <View className='flex-1 w-full border border-slate-300 rounded-3xl p-4 justify-center flex flex-col gap-5 h-44'>
              <View className='flex flex-row gap-4 items-center text-slate-700'>
                <Icon name="CircleCheckBig" size={25} color={colors.primary} />
                <View>
                  <Text style={{ fontSize: 16, color: colors.primary }} className='font-semibold'>{t('loaded')}</Text>
                  <Text style={{ fontSize: 13, color: colors.onSurfaceDisabled }} className='font-medium'>
                    {goal.toFixed(0) + " " + t('kcals')}
                  </Text>
                </View>
              </View>
              <View className='flex flex-row gap-4 items-center text-slate-700'>
                <Icon name="ShieldAlert" size={25} color={colors.error} />
                <View>
                  <Text style={{ fontSize: 16, color: colors.error }} className='font-semibold'>{t('exceeded')}</Text>
                  <Text style={{ fontSize: 13, color: colors.onSurfaceDisabled }} className='font-medium'>
                    {goal.toFixed(0) + " " + t('kcals')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex-row gap-4 mt-4">
            {/* Cột trái: Protein & Fat */}
            <View className="flex-1 justify-between gap-4">
              {/* Protein */}
              <TouchableOpacity className="border border-slate-300 rounded-3xl p-4 h-28 flex flex-row items-center gap-4">
                <UtensilsCrossed size={24} color={colors.primary} />
                <View>
                  <Text className="text-lg font-semibold mb-1">{t('protein')}</Text>
                  <Text className="text-base text-gray-500">25g -
                    <Text style={{ color: colors.primary }} className='font-semibold'> 180 kcal</Text>
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Fat */}
              <TouchableOpacity className="border border-slate-300 rounded-3xl p-4 h-28 flex flex-row items-center gap-4">
                <Apple size={24} color={colors.primary} />
                <View>
                  <Text className="text-lg font-semibold mb-1">{t('fat')}</Text>
                  <Text className="text-base text-gray-500">20g -
                    <Text style={{ color: colors.primary }} className='font-semibold'> 180 kcal</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Cột phải: Carb lớn hơn */}
            <TouchableOpacity className="flex-1 border border-slate-300 rounded-3xl p-4 justify-between h-60">
              <View>
                <Text className="text-lg font-semibold mb-1">{t('carbs')}</Text>
                <Text className="text-base text-gray-500 mb-1">40g -
                  <Text style={{ color: colors.primary }} className='font-semibold'> 180 kcal</Text>
                </Text>

                {/* Thêm biểu đồ nhỏ nếu muốn */}
                <View className="mt-2 space-y-1">
                  <Text className="text-xs text-gray-600">Fiber: 5g</Text>
                  <Text className="text-xs text-gray-600">Sugar: 12g</Text>
                </View>
              </View>

              <View className="items-end">
                <BarChart size={24} color={colors.primary} />
              </View>
            </TouchableOpacity>
          </View>

        </View>
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

