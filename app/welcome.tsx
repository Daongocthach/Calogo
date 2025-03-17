import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useForm } from "react-hook-form"
import { RadioButton } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import Slider from '@react-native-community/slider';

import useStore from '@/store'
import { Firework, HelloWave, ProgressStep, ProgressSteps } from '@/components'
import { GenderType, IntensiveType } from '@/lib/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const intensityOptions = ['inactive', 'low', 'medium', 'high', 'super'];
const imageSources: { [key: string]: any } = {
  inactive: require('@/assets/images/inactive.jpg'),
  low: require('@/assets/images/low.jpg'),
  medium: require('@/assets/images/medium.jpg'),
  high: require('@/assets/images/high.jpg'),
  super: require('@/assets/images/super.jpg'),
};
const descriptions: { [key: string]: string } = {
  inactive: 'Ít \n (Không tập thể dục)',
  low: 'Nhẹ nhàng \n (Thể dục 1-3 ngày/tuần)',
  medium: 'Vừa phải \n (Thể dục 3-5 ngày/tuần)',
  high: 'Năng động \n (Thể dục 6-7 ngày/tuần)',
  super: 'Cường độ cao \n (Thể dục hơn 90p/ngày, \n công việc nặng)',
};

const goalOptions = ['fast', 'medium', 'maintain', 'gain'];
const imageGoalSources: { [key: string]: any } = {
  fast: require('@/assets/images/loose-fast.jpg'),
  medium: require('@/assets/images/loose-medium.jpg'),
  maintain: require('@/assets/images/maintain.jpg'),
  gain: require('@/assets/images/gain.jpg'),
};
const goalDescriptions: { [key: string]: string } = {
  fast: 'Giảm cân nhanh \n (0,75kg/tuần)',
  medium: 'Giảm trung bình \n (0,5kg/tuần)',
  maintain: 'Giữ nguyên cân nặng \n (Tối ưu sức khỏe của bạn)',
  gain: 'Tăng cân \n (0,5kg/tuần)',
};





export default function WelcomeScreen() {
  const [height, setHeight] = useState<number>(168)
  const [weight, setWeight] = useState(50);
  const [age, setAge] = useState(17);
  const [unit, setUnit] = useState('kg');

  const increaseHeight = () => {
    if (height < 250) {
      setHeight(height + 1);
    }
  };

  const decreaseHeight = () => {
    if (height > 100) {
      setHeight(height - 1);
    }
  };

  const adjustWeight = (delta: number) => {
    setWeight((prev) => Math.max(1, prev + delta));
  };

  const adjustAge = (delta: number) => {
    setAge((prev) => Math.max(1, prev + delta));
  };

  const { saveData } = useStore()
  const [gender, setGender] = useState<GenderType>('male')
  const [intensity, setIntensity] = useState<IntensiveType>('medium')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      height: "",
      weight: "",
      age: "",
    },
  })

  const onSubmit = (data: any) => {
    const weight = parseFloat(data.weight)
    const height = parseFloat(data.height)
    const age = parseInt(data.age, 10)

    if (!weight || !height || !age) return

    let bmr = gender === "male"
      ? 66 + (13.75 * weight) + (5 * height) - (6.76 * age)
      : 655 + (9.56 * weight) + (1.85 * height) - (4.68 * age)

    const activityMultipliers = {
      inactive: 1.2,
      low: 1.375,
      medium: 1.55,
      high: 1.725,
      super: 1.9
    }

    const tdee = bmr * activityMultipliers[intensity]

    saveData({
      bmr,
      tdde: tdee,
      bodyData: {
        height,
        weight,
        age,
        gender,
        intensive: intensity
      }
    })
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: 'Dữ liệu đã được lưu',
      visibilityTime: 2000,
      autoHide: true,
    })
  }

  const renderIntensityOptions = () => {
    return intensityOptions.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setIntensity(option as IntensiveType)}
        className={`
          flex flex-row items-center gap-2 p-4 rounded-xl 
          ${intensity === option ? 'bg-blue-50' : 'border border-blue-100'}
        `}
      >
        <RadioButton.Android
          value={option}
          status={intensity === option ? 'checked' : 'unchecked'}
          onPress={() => setIntensity(option as IntensiveType)}
          color='#3b82f6'
          uncheckedColor='#3b82f6'
        />
        <Image
          source={imageSources[option]}
          style={{ width: 100, height: 100, borderRadius: 20 }}
          resizeMode="contain"
        />
        <Text className="text-base text-center text-blue-500 font-semibold flex-1">
          {descriptions[option]}
        </Text>
      </TouchableOpacity>
    ));
  };

  const renderGoalOptions = () => {
    return goalOptions.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setIntensity(option as IntensiveType)}
        className={`
          flex flex-row items-center gap-2 p-4 rounded-xl 
          ${intensity === option ? 'bg-blue-50' : 'border border-blue-100'}
        `}
      >
        <RadioButton.Android
          value={option}
          status={intensity === option ? 'checked' : 'unchecked'}
          onPress={() => setIntensity(option as IntensiveType)}
          color='#3b82f6'
          uncheckedColor='#3b82f6'
        />
        <Image
          source={imageGoalSources[option]}
          style={{ width: 100, height: 100, borderRadius: 20, backgroundColor: 'white' }}
          resizeMode="contain"
        />
        <Text className="text-base text-center text-blue-500 font-semibold flex-1">
          {goalDescriptions[option]}
        </Text>
      </TouchableOpacity>
    ));
  };
  return (
    <View className="relative flex-1">
      <ProgressSteps
        activeStepIconBorderColor="#3b82f6"
        completedStepIconColor="#3b82f6"
        activeLabelColor="#3b82f6"
        completedProgressBarColor="#3b82f6"
        activeStepNumColor="#3b82f6"
        disabledStepIconColor="#eff6ff"
        labelColor='#475569'
        disabledStepNumColor='#3b82f6'
        completedLabelColor='#3b82f6'
      >
        <ProgressStep>
          <View className='flex-1 p-1'>
            <View style={styles.containerShadow}>
              <Text className='text-xl font-semibold text-gray-500 w-full text-center mb-4'>Chọn giới tính của bạn</Text>
              <View className="flex flex-row gap-2 ">
                <TouchableOpacity
                  className={`flex-1 flex flex-row items-center justify-center gap-2 py-8 rounded-xl 
                    ${gender === 'male' ? 'bg-blue-50' : 'border border-blue-50'}`}
                  onPress={() => setGender('male')}
                >
                  <RadioButton.Android
                    value="male"
                    status={gender === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('male')}
                    color='#3b82f6'
                    uncheckedColor='#3b82f6'
                  />
                  <MaterialCommunityIcons name="face-man" size={30} color={"#3b82f6"} />
                  <Text className="text-xl text-center font-semibold text-blue-500">Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 flex flex-row items-center justify-center gap-2 py-8 rounded-xl 
                    ${gender === 'female' ? 'bg-blue-50' : 'border border-blue-50'}`}
                  onPress={() => setGender('female')}
                >
                  <RadioButton.Android
                    value="female"
                    status={gender === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('female')}
                    color='#3b82f6'
                    uncheckedColor='#3b82f6'
                  />
                  <MaterialCommunityIcons name="face-woman" size={30} color={"#3b82f6"} />
                  <Text className="text-xl text-center font-semibold text-blue-500">Nữ</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerShadow} className='mt-6'>
              <View className='flex flex-row items-center justify-between w-full'>
                <Text className='text-xl font-semibold text-gray-500'>Chiều cao</Text>
                <View className="px-2 py-1 rounded-md bg-lime-100">
                  <Text className="text-lime-500 font-bold">cm</Text>
                </View>
              </View>
              <TextInput
                className="text-blue-500 text-5xl font-bold text-center"
                keyboardType="numeric"
                value={height.toString()}
                onChangeText={(text) => setHeight(parseFloat(text) || 0)}
              />
              <View className='flex flex-row justify-center items-center gap-2'>
                <TouchableOpacity style={{ flex: 0 }} onPress={decreaseHeight}>
                  <MaterialCommunityIcons name="minus" size={20} color={"#9ca3af"} />
                </TouchableOpacity>
                <Slider
                  style={{ flex: 1, height: 35 }}
                  minimumValue={100}
                  maximumValue={250}
                  minimumTrackTintColor="#3b82f6"
                  maximumTrackTintColor="#6b7280"
                  thumbTintColor='#3b82f6'
                  value={height}
                  step={1}
                  onValueChange={(value) => setHeight(value)}
                  onSlidingComplete={e => {
                    setHeight(e)
                  }}
                />
                <TouchableOpacity style={{ flex: 0 }} onPress={increaseHeight}>
                  <MaterialCommunityIcons name="plus" size={20} color={"#9ca3af"} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-row justify-center gap-4 mt-6">
              {/* Cân nặng */}
              <View style={styles.containerShadow} className='flex-1'>
                <View className="flex flex-row items-center justify-between w-full">
                  <Text className="text-gray-500 text-xl font-semibold">Cân nặng</Text>
                  <View className="px-2 py-1 rounded-md bg-lime-100">
                    <Text className="text-lime-500 font-bold">kg</Text>
                  </View>
                </View>
                <TextInput
                  className="text-blue-500 text-5xl font-bold text-center mt-4"
                  keyboardType="numeric"
                  value={weight.toString()}
                  onChangeText={(text) => setWeight(parseFloat(text) || 0)}
                />
                <View className="flex flex-row justify-between w-full mt-2">
                  <TouchableOpacity onPress={() => adjustWeight(-1)}>
                    <MaterialCommunityIcons name="minus" size={28} color={"#9ca3af"} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => adjustWeight(1)}>
                    <MaterialCommunityIcons name="plus" size={28} color={"#9ca3af"} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Tuổi */}
              <View style={styles.containerShadow} className='flex-1'>
                <View className="flex flex-row items-center justify-between w-full">
                  <Text className="text-gray-500 text-xl text-center font-semibold">Tuổi</Text>
                  <View className="px-2 py-1 rounded-md bg-lime-100">
                    <Text className="text-lime-500 font-bold">age</Text>
                  </View>
                </View>
                <TextInput
                  className="text-blue-500 text-5xl font-bold text-center mt-4"
                  keyboardType="numeric"
                  value={age.toString()}
                  onChangeText={(text) => setAge(parseInt(text) || 0)}
                />
                <View className="flex flex-row justify-between w-full mt-2">
                  <TouchableOpacity onPress={() => adjustAge(-1)}>
                    <MaterialCommunityIcons name="minus" size={28} color={"#9ca3af"} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => adjustAge(1)}>
                    <MaterialCommunityIcons name="plus" size={28} color={"#9ca3af"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ProgressStep>

        {/* Mức độ vận động */}
        <ProgressStep>
          <Text className="text-gray-500 text-xl font-semibold w-full text-center mb-4">Mức độ vận động của bạn thế nào?</Text>
          <View className='flex flex-col gap-2'>
            {renderIntensityOptions()}
          </View>
        </ProgressStep>

        {/* Chọn chế độ tăng/giảm cân */}
        <ProgressStep>
          <Text className="text-gray-500 text-xl font-semibold w-full text-center mb-4">Mục tiêu của bạn là gì?</Text>
          <View className='flex flex-col gap-2'>
            {renderGoalOptions()}
          </View>
        </ProgressStep>

        {/* Hoàn tất */}
        <ProgressStep onSubmit={handleSubmit(onSubmit)}
        >
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Firework />
            <Text className="text-lg text-center mt-4">
              Chúc mừng bạn đã hoàn tất việc nhập thông tin cơ bản. Nhấn nút
              <Text className='font-bold text-blue-500'> "Hoàn tất" </Text>
              để lưu thông tin.
            </Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  )
}


const styles = StyleSheet.create({
  containerShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
});