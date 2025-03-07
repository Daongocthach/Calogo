import { useCallback } from 'react'
import { View, Image, TouchableOpacity, Pressable } from 'react-native'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useTheme, Icon } from 'react-native-paper'

import IMAGES from '@/assets/images'
import { CustomMenu, MenuTranslate, CustomButton, CustomText } from '@/components'
import useStore from '@/store'

const noLogoHeaders = [
  'machines', 
  'add machine', 
  'arbor info', 
  'install arbor', 
  'out foundry', 
  'nfc history', 
  'app settings', 
  'app users',
  'reminder',
]

function Header({ navigation }: { navigation: any }) {
  const route = useRoute()
  const { colors } = useTheme()
  const { t } = useTranslation()
  
  const isNologo = noLogoHeaders.some((item) => t(item) === route.name)
  const { lateItems, getReminderLate, todayItems, getReminderToday, darkMode, setDarkMode } = useStore()

  useFocusEffect(
    useCallback(() => {
      if (!lateItems)
        getReminderLate()
    }, [lateItems, getReminderLate])
  )
  useFocusEffect(
    useCallback(() => {
      if (!todayItems)
        getReminderToday()
    }, [todayItems, getReminderToday])
  )
  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }
  return (
    <View className='flex flex-row justify-between items-center py-3 w-full'>
      {isNologo ?
        <View className='flex flex-row items-center'>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon source='chevron-left' size={30} color={colors.onBackground} />
          </Pressable>
          <CustomText className="text-lg font-semibold">{t(route.name)}</CustomText>
        </View>
        :
        <TouchableOpacity onPress={() => navigation.navigate(t('home'))} className='flex flex-row items-center justify-center gap-1'>
          <Image source={IMAGES.LOGO} style={{ width: 46, height: 46 }} resizeMode="contain" />
          <View className='mb-1'>
            <CustomText className="text-xl font-bold tracking-[4.5px]">finepro</CustomText>
            <CustomText className="text-[10px] font-bold uppercase tracking-[3px]">Automation</CustomText>
          </View>
        </TouchableOpacity>
      }
      <View className='flex flex-row items-center'>
        <>
          <CustomButton
            handle={() => navigation.navigate(t('reminder'))}
            icon='bell-outline'
            iconColor={route.name === t('reminder') ? colors.primary : colors.onBackground}
          >
            {((lateItems && lateItems.length > 0) ||
              (todayItems && todayItems.length > 0)) && (
                <View className='absolute top-0 right-0'>
                  <Icon source='circle' size={10} color={colors.error} />
                </View>
              )}
          </CustomButton>
          <CustomButton
            buttonClassName='pl-4'
            handle={() => navigation.navigate(t('nfc history'))}
            icon='history'
            iconColor={route.name === t('nfc history') ? colors.primary : colors.onBackground}
          />
        </>
        <CustomButton
          icon={darkMode ? 'lightbulb-on-outline' : 'weather-night'}
          handle={toggleTheme}
          iconColor={colors.onBackground}
          buttonClassName='pl-4'
        />
        <MenuTranslate />
        <CustomMenu navigation={navigation} route={route}/>
      </View>
    </View>
  )
}

export default Header
