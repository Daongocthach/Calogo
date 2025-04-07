import { useState } from 'react'
import { View, SectionList, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { FoodItem } from '@/components/common/FoodItem'
import { BarChart } from "react-native-gifted-charts"
import { DateSelector, Icon } from '@/components'
import { FoodDailyItemType } from '@/lib/types'
import useStore from '@/store'
import NutrientSummary from '@/components/common/NutrientSummary'
import WeeklyBarChart from '@/components/common/WeeklyBarchart'
import { useTranslation } from 'react-i18next'
import MonthlyLineChart from '@/components/common/onthlyLineChart'

type GroupedFood = {
  title: string
  data: FoodDailyItemType[]
}

const groupByDate = (data: FoodDailyItemType[]): GroupedFood[] => {
  const grouped = data.reduce<{ [key: string]: FoodDailyItemType[] }>((acc, item) => {
    const date = new Date(item.time).toLocaleDateString('vi-VN')
    if (!acc[date]) acc[date] = []
    acc[date].push(item)
    return acc
  }, {})

  return Object.entries(grouped).map(([title, data]) => ({ title, data }))
}

export default function Statistics() {
  const { t } = useTranslation()
  const { historyFoodList, weekHistoryCalories } = useStore()
  const groupedData = groupByDate(historyFoodList)

  const barData = weekHistoryCalories.map((calories, index) => {
    const frontColor = ['#177AD5', '#177AD5', '#177AD5'][index] || ''

    return {
      value: calories,
      frontColor: frontColor,

    }
  })
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>(() => {
    const firstTitle = groupedData.length > 0 ? groupedData[0].title : null
    return firstTitle ? { [firstTitle]: true } : {}
  })

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <ScrollView className="flex-1 relative px-4 mb-4">
      <DateSelector />
      <NutrientSummary />
      <WeeklyBarChart
        data={[
          {
            label: t('mon'), value: 20,
            highlight: false
          },
          {
            label: t('tue'), value: 35,
            highlight: false
          },
          { label: t('wed'), value: 55, highlight: true },
          {
            label: t('thu'), value: 30,
            highlight: false
          },
          {
            label: t('fri'), value: 25,
            highlight: false
          },
          {
            label: t('sat'), value: 40,
            highlight: false
          },
          {
            label: t('sun'), value: 15,
            highlight: false
          },
        ]}
      />

      <MonthlyLineChart
        data={[
          { label: t('jan'), value: 300 },
          { label: t('feb'), value: 500 },
          { label: t('mar'), value: 200 },
          { label: t('apr'), value: 600 },
          { label: t('may'), value: 600 },
          { label: t('jun'), value: 400 },
          { label: t('jul'), value: 600 },
          { label: t('aug'), value: 1000 },
          { label: t('sep'), value: 1100 },
          { label: t('oct'), value: 300 },
          { label: t('nov'), value: 500 },
          { label: t('dec'), value: 700 },
        ]}
      />

    </ScrollView>
  )
}


