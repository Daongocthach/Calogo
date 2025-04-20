import { useFonts } from 'expo-font'
import { useRouter, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import Toast from 'react-native-toast-message'
import { PaperProvider, useTheme } from 'react-native-paper'
import { I18nextProvider } from "react-i18next"
import { useTranslation } from 'react-i18next'

import i18next from '@/locales'
import { lightTheme, darkTheme } from '@/theme/theme'
import useStore from '@/store'
import "../global.css"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const router = useRouter()
  const { colors } = useTheme()
  const { t } = useTranslation()
  const { darkMode, bmr } = useStore()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <PaperProvider theme={darkMode ? darkTheme : lightTheme} >
      <I18nextProvider i18n={i18next}>
        <Stack screenOptions={{}}>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="add-meal" options={{ title: t('add meal'), contentStyle: { padding: 12, backgroundColor: colors.background } }} />
        </Stack>
        <Toast />
        {/* <StatusBar style="auto" /> */}
      </I18nextProvider>
    </PaperProvider>
  )
}
