import * as React from 'react';
import { List } from 'react-native-paper';

const AddMeal = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

export default AddMeal;


// import { useState } from 'react'
// import { Text, TouchableOpacity, View, ScrollView, TextInput, Alert } from 'react-native'
// import { PieChart } from "react-native-gifted-charts"
// import { useForm, Controller } from "react-hook-form"
// import { useTranslation } from 'react-i18next'
// import { useTheme } from 'react-native-paper'

// import {
//   ClockInformation,
//   CustomDropDown,
//   CustomModal,
//   FoodItem,
//   CustomText,
//   Icon
// } from '@/components'
// import WelcomeScreen from '@/app/welcome'
// import useStore from '@/store'
// import { FoodTypes } from '@/lib/constants/FoodTypes'
// import { FoodItemType } from '@/lib/types'
// import { showToast } from '@/notification'

// const [type, setType] = useState('fastfood')
// const [selectedFoodList, setSelectedFoodList] = useState<FoodItemType[]>([])
// const foodTypes = Object.entries(FoodTypes).map(([key, value]) => ({
//   label: value.name,
//   value: key,
// }))
// const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       carbsWeight: "",
//       proteinsWeight: "",
//       fatsWeight: "",
//     },
//   })
//   const onSubmit = (data: any) => {
//     addFood({
//       ...data,
//       type,
//       id: Math.random().toString(36).substring(7),
//       calories: data.carbsWeight * 4 + data.proteinsWeight * 4 + data.fatsWeight * 9,
//     })
//     showToast('add_food_success')
//     reset()
//   }
//   const handleRemoveSelectedFood = (id: string) => {
//     Alert.alert('Loại thực phẩm này', 'Bạn chắc chắn muốn loại thực phẩm này khỏi danh sách?', [
//       {
//         text: 'Không',
//         style: 'cancel'
//       },
//       {
//         text: 'Xóa',
//         onPress: () => {
//           setSelectedFoodList(selectedFoodList.filter((food) => food.id !== id))
//         }
//       }
//     ])
//   }
//   const handleAddMeal = () => {
//     if (selectedFoodList.length < 1) {
//       showToast('no_food_selected')
//     }
//     else {
//       selectedFoodList.forEach((food) => {
//         addTodayFood({ ...food, time: new Date().toISOString() });
//         addHistoryFood({ ...food, time: new Date().toISOString() });
//       })
//       setSelectedFoodList([])
//       setModalVisible(false)
//     }
//   }

{/* <View>
                <Text className='text-xl font-bold'>Thêm bữa ăn</Text>
                <Text className='text-gray-800'>Chọn thực phẩm bạn muốn thêm vào bữa ăn</Text>
                <View className='mt-4'>
                  <Collapsible title="Chọn thực phẩm có sẵn">
                    <ScrollView className='max-h-36'>
                      {foodList.map((item, index) => (
                        <TouchableOpacity onPress={() => setSelectedFoodList([...selectedFoodList, item])} key={index}>
                          <FoodItem isSample {...item} />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </Collapsible>
                </View>
                <View className='mt-4'>
                  <Collapsible title="Nhập mới">
                    <ScrollView className='max-h-44'>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <View className="h-12 flex-row items-center border-b border-sky-600 rounded w-full mb-2 bg-slate-50">
                            <TextInput
                              className='flex-1 p-3'
                              placeholder="Tên thực phẩm"
                              placeholderTextColor="#888"
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                            />
                          </View>
                        )}
                        name="name"
                      />
                      {errors.name && <Text className='mb-2 text-red-500'>Tên thực phẩm không được để trống</Text>}
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <View className="h-12 flex-row items-center border-b border-sky-600 rounded w-full mb-2 bg-slate-50">
                            <TextInput
                              className="flex-1 p-3"
                              placeholder="Nhập lượng tinh bột (carbs)"
                              keyboardType="numeric"
                              placeholderTextColor="#888"
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                            />
                            <Text className="text-gray-500">(g)</Text>
                          </View>
                        )}
                        name="carbsWeight"
                      />
                      {errors.carbsWeight && <Text className='mb-2 text-red-500'>Lượng tinh bột/đường không được để trống.</Text>}
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <View className="h-12 flex-row items-center border-b border-sky-600 rounded w-full mb-2 bg-slate-50">
                            <TextInput
                              className="flex-1 p-3"
                              placeholder="Nhập lượng proteins"
                              keyboardType="numeric"
                              placeholderTextColor="#888"
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                            />
                            <Text className="text-gray-500">(g)</Text>
                          </View>
                        )}
                        name="proteinsWeight"
                      />
                      {errors.proteinsWeight && <Text className='mb-2 text-red-500'>Lượng proteins không được để trống.</Text>}
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <View className="h-12 flex-row items-center border-b border-sky-600 rounded w-full mb-2 bg-slate-50">
                            <TextInput
                              className="flex-1 p-3"
                              placeholder="Nhập lượng chất béo (fats)"
                              keyboardType="numeric"
                              placeholderTextColor="#888"
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                            />
                            <Text className="text-gray-500">(g)</Text>
                          </View>
                        )}
                        name="fatsWeight"
                      />
                      {errors.fatsWeight && <Text className='mb-2 text-red-500'>Lượng chất béo không được để trống.</Text>}
                      <CustomDropDown
                        selects={foodTypes}
                        select={type}
                        setSelect={setType}
                        placeholder='Chọn loại thực phẩm'
                        isSearch
                      />
                      <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        className='bg-[#2196F3] p-2 rounded mt-2 flex flex-row items-center justify-center gap-2'
                      >
                        <Icon name="Plus" size={25} color="#0284c7" />
                        <Text className='text-white font-bold'>Thêm mới</Text>
                      </TouchableOpacity>
                    </ScrollView>
                  </Collapsible>
                  <View className='mt-4'>
                    <Collapsible title="Thực phẩm đã chọn" isTrue>
                      <ScrollView className='max-h-36'>
                        {selectedFoodList.length < 1 ?
                          <View className='flex-1 justify-center items-center h-28'>
                            <Text className='text-gray-500'>Chưa chọn thực phẩm nào!</Text>
                          </View>
                          : selectedFoodList.map((item, index) => (
                            <TouchableOpacity
                              onPress={() => handleRemoveSelectedFood(item.id)}
                              key={index}
                            >
                              <FoodItem  {...item} />
                            </TouchableOpacity>
                          ))}
                      </ScrollView>
                    </Collapsible>
                  </View>
                </View>
              </View> */}