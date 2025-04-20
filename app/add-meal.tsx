import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TabView } from 'react-native-tab-view'
import { useWindowDimensions } from 'react-native'

import { ManualTab, ScannerTab, renderTabBar } from '@/components'

export default function AddMealScreen() {
    const { t } = useTranslation()
    const layout = useWindowDimensions()
    const [index, setIndex] = useState<number>(0)

    const [routes] = useState([
      { key: 'manual', title: t('manual') },
      { key: 'camera', title: t('camera') },
    ])
    const renderScene = ({ route }: any) => {
      switch (route.key) {
        case 'manual':
          return <ManualTab />
        case 'camera':
          return <ScannerTab />
        default:
          return null
      }
    }

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    )
}