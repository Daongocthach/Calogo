import { Tabs } from 'expo-router'
import React from 'react'
import { useTheme } from "react-native-paper"

import { CustomHeader, HapticTab, Icon } from '@/components'

export default function TabLayout() {
  const { colors } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        header: () => <CustomHeader />,
        tabBarButton: HapticTab,
        sceneStyle: {
          backgroundColor: colors.background,
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 55,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <Icon size={28} name="House" color={color} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Báo cáo',
          tabBarIcon: ({ color }) => <Icon size={28} name="ChartNoAxesColumn" color={color} />,
        }}
      />
      <Tabs.Screen
        name="foods"
        options={{
          title: 'Thực phẩm',
          tabBarIcon: ({ color }) => <Icon size={28} name="Ham" color={color} />,
        }}
      />
    </Tabs>
  )
}