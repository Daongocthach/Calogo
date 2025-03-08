import { Platform, Switch, TouchableOpacity, Alert, ScrollView, View } from 'react-native'
import { useState } from 'react'
import { Link, router } from 'expo-router'

import { HelloWave, IconSymbol, Collapsible, CustomText } from '@/components'
import useStore from '@/store'

export default function Settings() {
  const { removeData } = useStore()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const handleDelete = () => {
    Alert.alert('Xóa thông tin BMR', 'Bạn chắc chắn muốn xóa?', [
      {
        text: 'Không',
        style: 'cancel'
      },
      {
        text: 'Xóa',
        onPress: () => {
          removeData()
        }
      }
    ])
  }
  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn chắc chắn muốn đăng xuất?', [
      {
        text: 'Không',
        style: 'cancel'
      },
      {
        text: 'Đăng xuất',
        onPress: () => {
          router.push('/login')
        }
      }
    ])
  }
  return (
    <ScrollView>
      <View className='flex flex-row gap-2'>
        <CustomText>Cài đặt</CustomText>
        <HelloWave />
      </View>
      <CustomText>Chào mừng bạn đến trung tâm cài đặt.</CustomText>
      <View className='flex flex-col gap-6'>
        <Collapsible title="Thông tin tài khoản">
          <View className='ml-3 flex flex-col gap-4 my-4'>
            <Link href='/login' className='flex flex-row items-center gap-2'>
              <View className='flex flex-row items-center gap-2'>
                <IconSymbol name="arrow.right.circle.fill" size={20} color={'#64748b'} />
                <CustomText className='text-slate-500'>Đăng nhập</CustomText>
              </View>
            </Link>
            <Link href='/signup' className='flex flex-row items-center gap-2'>
              <View className='flex flex-row items-center gap-2'>
                <IconSymbol name="person.badge.plus.fill" size={20} color={'#64748b'} />
                <CustomText className='text-slate-500'>Đăng ký</CustomText>
              </View>
            </Link>
            <Link href='/reset-password' className='flex flex-row items-center gap-2'>
              <View className='flex flex-row items-center gap-2'>
                <IconSymbol name="key.fill" size={20} color={'#64748b'} />
                <CustomText className='text-slate-500'>Đổi mật khẩu</CustomText>
              </View>
            </Link>
            <TouchableOpacity className='flex flex-row items-center gap-2' onPress={handleLogout}>
              <IconSymbol name="arrow.left.circle.fill" size={20} color={'#64748b'} />
              <CustomText className='text-slate-500'>Đăng xuất</CustomText>
            </TouchableOpacity>
            <TouchableOpacity className='flex flex-row items-center gap-2' onPress={handleDelete}>
              <IconSymbol name="delete.left.fill" size={20} color={'#64748b'} />
              <CustomText className='text-slate-500'>Xóa thông tin BMR</CustomText>
            </TouchableOpacity>
          </View>
        </Collapsible>
        <Collapsible title="Chế độ sáng tối">
          <View className='text-sky-600 flex flex-row items-center gap-1 ml-3 mt-4'>
            <IconSymbol name="sun.max.fill" size={20} color={'#64748b'} />
            <IconSymbol name="moon.fill" size={20} color={'#64748b'} />
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ true: '#D0D0D0', false: '#D0D0D0' }}
              thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : '#64748b'}
            />
          </View>
        </Collapsible>
        <Collapsible title="Một số thông tin cần thiết">
          <CustomText className='ml-3 text-slate-500 mt-4'>
            Email: ngocthach752@gmail.com
          </CustomText>
          <CustomText className='ml-3 text-slate-500 mt-4'>
            Calories=(Carb×4)+(Protein×4)+(Fat×9)
          </CustomText>
          <CustomText className='ml-3 text-slate-500 mt-4'>
            Nam: BMR = (10 x Cân Nặng(kg)) + (6,25 x Chiều Cao(cm)) – (5 x Tuổi) + 5.
          </CustomText>
          <CustomText className='ml-3 text-slate-500 mt-4'>
            Nữ: BMR = (10 x Cân Nặng(kg)) + (6,25 x Chiều cao(cm)) – (5 x Tuổi) – 161.
          </CustomText>
          <CustomText className='ml-3 text-slate-500 mt-4'>
            TDEE = BMR × Hệ số vận động (1.2-1.9)
          </CustomText>
        </Collapsible>
      </View>
    </ScrollView>
  )
}