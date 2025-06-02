import { useState } from 'react'
import { TouchableOpacity, View, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'

import { FoodItem, Icon } from '@/components'
import { FoodTypeSamples } from '@/lib'
import useStore from '@/store'
import SearchInput from '@/components/common/SearchInput'

const foodTypes = Object.entries(FoodTypeSamples).map(([key, value]) => ({
  label: value.name,
  value: key,
}))

export default function Foods() {
  const router = useRouter()
  const { foodList } = useStore()

  return (
    <View className='flex-1 relative px-4'>
      <SearchInput />
      <ScrollView className='px-1 mb-4'>
        {Array.isArray(foodList) && foodList.map((item, index) => (
            <FoodItem {...item} key={index}/>
        ))}
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
        onPress={() => router.push('/add-food')}
      >
        <Icon name="Plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}