import { useState } from 'react'
import { Text, TouchableOpacity, View, ScrollView, TextInput, Alert } from 'react-native'
import { useForm, Controller } from "react-hook-form"
import Toast from 'react-native-toast-message'

import { FoodItem, CustomModal, CustomDropDown, Icon } from '@/components'
import { FoodTypeSamples, FoodProps } from '@/lib'
import useStore from '@/store'
import SearchInput from '@/components/common/SearchInput'

const foodTypes = Object.entries(FoodTypeSamples).map(([key, value]) => ({
  label: value.name,
  value: key,
}))

export default function Foods() {
  const { addFood, editFood, deleteFood, foodList } = useStore()
  const [modalVisible, setModalVisible] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editFoodItem, setEditFoodItem] = useState<FoodProps>()
  const [type, setType] = useState('fastfood')
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      carbsWeight: "",
      proteinsWeight: "",
      fatsWeight: "",
    },
  })

  const handleAddFood = () => {
    setModalVisible(true)
    reset()
    setIsEdit(false)
  }

  return (
    <View className='flex-1 relative px-4'>
      <SearchInput />
      <ScrollView className='px-1 mb-4'>
        {Array.isArray(foodList) && foodList.map((item, index) => (
          // <TouchableOpacity onPress={() => handleSelectFood(item)} key={index}>
            <FoodItem {...item} key={index}/>
          // </TouchableOpacity>
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
        onPress={handleAddFood}
      >
        <Icon name="Plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}