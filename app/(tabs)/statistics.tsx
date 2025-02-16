import { useState } from 'react'
import { View, SectionList, Text, TouchableOpacity, ScrollView } from 'react-native'
import { FoodItem } from '@/components/FoodItem'
import { ClockInformation } from '@/components/ClockInformation'
import { BarChart } from "react-native-gifted-charts"
import { IconSymbol } from '@/components/ui/IconSymbol'
import { FoodDailyItemType } from '@/lib/types'
import useStore from '@/store'

type GroupedFood = {
  title: string
  data: FoodDailyItemType[]
}


const barData = [
  { value: 250, label: 'M' },
  { value: 500, label: 'T', frontColor: '#177AD5' },
  { value: 745, label: 'W', frontColor: '#177AD5' },
  { value: 320, label: 'T' },
  { value: 600, label: 'F', frontColor: '#177AD5' },
  { value: 256, label: 'S' },
  { value: 300, label: 'S' },
]

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
  const { historyFoodList } = useStore()
  console.log(historyFoodList)
  const groupedData = groupByDate(historyFoodList)

  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>(() => {
    const firstTitle = groupedData.length > 0 ? groupedData[0].title : null
    return firstTitle ? { [firstTitle]: true } : {}
  })

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <View className="flex-1 items-center relative px-4">
      <ClockInformation />
      <View className='mt-4'>
        <BarChart
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          frontColor="lightgray"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>
      {/* <ScrollView className='mt-4'>
        {historyFoodList.map((item, index) => (
          <FoodItem key={index} {...item} />
        ))}
      </ScrollView> */}
      <View className='w-full'>

        <SectionList
          contentContainerStyle={{ marginTop: 10 }}
          sections={groupedData}
          keyExtractor={(item, index) => item.name + index}
          renderSectionHeader={({ section: { title } }) => (
            <TouchableOpacity onPress={() => toggleSection(title)} className="mt-4 flex flex-row items-center gap-2">
              <IconSymbol name="circle.dotted.circle" size={15} color="#0284c7" />
              <Text className="text-lg font-bold text-sky-600">{`Ngày ${title}`}</Text>
              <IconSymbol name={expandedSections[title] ? 'chevron.up.2' : 'chevron.down.2'} size={20} color="#0284c7" />
            </TouchableOpacity>
          )}
          renderItem={({ item, section }) =>
            expandedSections[section.title] ? (
              <FoodItem key={item.id} {...item} />
            ) : null
          }
        />
      </View>

    </View>
  )
}
