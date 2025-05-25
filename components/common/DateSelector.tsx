import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient'

import CustomText from '@/components/common/CustomText'
import Icon from '@/components/common/Icon'

export default function DateSelector() {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [monthDays, setMonthDays] = useState<Date[]>([])
  const [showPicker, setShowPicker] = useState(false)

  const scrollRef = useRef<ScrollView>(null)
  const dayRefs = useRef<Record<string, View | null>>({})

  useEffect(() => {
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    })
    setMonthDays(daysInMonth)

    setTimeout(() => {
      scrollToSelectedDay(currentDate)
    }, 200)

  }, [currentDate])

  const scrollToSelectedDay = (selectedDate: Date) => {
    const formattedDay = format(selectedDate, 'dd/MM/yyyy')
    const selectedRef = dayRefs.current[formattedDay]

    if (selectedRef && scrollRef.current) {
      selectedRef.measureLayout(
        scrollRef.current as any,
        (x) => {
          scrollRef.current?.scrollTo({ x: Math.max(x - 16, 0), animated: true })
    },
    () => {
      console.log('Không thể đo vị trí của ngày đã chọn.')
    }
      )
}
  }

const onChangeDate = (_: any, selectedDate?: Date) => {
  if (selectedDate) {
    setCurrentDate(selectedDate)
  }
  setShowPicker(false)
}

return (
  <View className='flex flex-row items-center' style={{ paddingBottom: 10 }}>
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {monthDays.map((day, index) => {
        const formattedDay = format(day, 'dd/MM/yyyy')
        const isCurrentDay = formattedDay === format(currentDate, 'dd/MM/yyyy')
        const isToday = formattedDay === format(new Date(), 'dd/MM/yyyy')

        const backgroundColor: readonly [string, string] = isCurrentDay ? ['#3b82f6', '#38bdf8'] : [colors.surface, colors.backdrop]

        return (
          <TouchableOpacity key={formattedDay} onPress={() => setCurrentDate(day)}>
            <LinearGradient
              colors={backgroundColor}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                marginRight: 5,
                padding: 16,
                borderRadius: 12
              }}
            >
              <View ref={(element) => (dayRefs.current[formattedDay] = element)}>
                <CustomText
                  className='text-sm font-semibold'
                  style={{
                    color: isCurrentDay
                      ? colors.onPrimary
                      : isToday
                        ? colors.onPrimaryContainer
                        : colors.onSurfaceVariant,
                  }}
                >
                  {isToday ? t('today') + " (" + format(day, 'dd') + ") " : format(day, 'dd')}
                </CustomText>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )
      })}
    </ScrollView>

    <TouchableOpacity onPress={() => setShowPicker(true)}>
      <LinearGradient
        colors={['#3b82f6', '#38bdf8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          marginLeft: 10,
          padding: 16,
          borderRadius: 12
        }}
      >
        <View className='flex flex-row items-center rounded-xl'>
          <Icon name='Calendar' size={15} color={colors.onPrimary} />
          <CustomText
            className='font-semibold text-sm ml-2'
            style={{ color: colors.onPrimary }}
          >
            {format(currentDate, 'yyyy-MM-dd')}
          </CustomText>

          {showPicker && (
            <DateTimePicker
              value={currentDate}
              mode="date"
              display='default'
              onChange={onChangeDate}
            />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  </View>

)
}