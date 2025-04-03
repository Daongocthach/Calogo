import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns'
import { enAU } from 'date-fns/locale'
import { CustomText, Icon } from '@/components'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

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
          scrollRef.current?.scrollTo({ x, animated: true })
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
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <CustomText className='font-semibold' style={{ fontSize: 16 }}>{t("today")}</CustomText>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Icon name='Calendar' size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <CustomText style={{ color: colors.primary, fontSize: 14 }} className='underline font-medium'>
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

      <ScrollView
        ref={scrollRef}
        horizontal
        style={{ padding: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {monthDays.map((day, index) => {
          const formattedDay = format(day, 'dd/MM/yyyy')
          const isCurrentDay = formattedDay === format(currentDate, 'dd/MM/yyyy')
          return (
            <TouchableOpacity key={formattedDay} onPress={() => setCurrentDate(day)}>
              <View
                ref={(element) => (dayRefs.current[formattedDay] = element)}
                style={{
                  backgroundColor: isCurrentDay ? colors.outlineVariant : colors.primaryContainer,
                  borderRadius: 12,
                  padding: 15,
                  marginRight: 8,
                }}
              >
                <CustomText
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: isCurrentDay ? colors.onSurfaceVariant : colors.onSurfaceVariant
                  }}>
                  {isCurrentDay ? t('today') : format(day, 'dd')}
                </CustomText>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}