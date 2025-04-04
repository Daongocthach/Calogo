import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useForm, Controller } from "react-hook-form"
import { Icon } from '@/components'
import { Link } from 'expo-router'

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (data: { username: string, password: string }) => {
    if (data) {
      console.log(data)
    }
  }

  return (
    <View className='flex-1 w-full px-8 pt-10'>
      <View className='flex flex-row items-center justify-center gap-2 mb-8'>
        <Image
          source={require('@/assets/images/logo-header.png')}
          style={{ width: 250, height: 75 }} resizeMode="contain"
        />
      </View>
      <View>
        <Text className='text-2xl font-bold mb-2'>Đăng nhập</Text>
        <Text className='text-sm mb-4'>Đăng nhập bằng tài khoản của bạn.</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 4
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='border border-gray-500 rounded p-3 mb-2'
              placeholder="Nhập tên đăng nhập"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="username"
        />
        {errors.username && <Text className='mb-2 text-red-500'>Tên đăng nhập phải có ít nhất 4 ký tự.</Text>}
        <View className='relative mb-2'>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 4
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='border border-gray-500 rounded p-3'
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showPassword}
              />
            )}
            name="password"
          />
          <TouchableOpacity
            className='absolute right-3 top-1/2 transform -translate-y-1/2'
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon size={15} name={showPassword ? 'Eye' : 'EyeOff'} color="gray" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text className='mb-4 text-red-500'>Mật khẩu phải có ít nhất 4 ký tự.</Text>}
        <TouchableOpacity className={`px-4 py-3.5 rounded-md bg-sky-500`} activeOpacity={0.5} onPress={handleSubmit(onSubmit)}>
          <Text className={`text-sm text-center font-bold text-white`}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <Text className='text-gray-500 text-center my-2'>Hoặc</Text>
        {/* Nút đăng nhập bằng Google */}
        <TouchableOpacity className='flex flex-row items-center justify-center px-4 py-3.5 rounded-md bg-sky-500' activeOpacity={0.5} onPress={() => console.log('Đăng nhập bằng Google')}>
        <Icon name="Globe" size={25} color="#0284c7" />
          <Text className='text-sm text-center font-bold text-white ml-2'>Đăng nhập bằng Google</Text>
        </TouchableOpacity>
        <View className='flex flex-row justify-between mb-6 mt-4'>
          <TouchableOpacity>
            <Text className='text-sky-500'>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <View className='flex flex-row justify-center'>
            <Text className='mr-1'>Chưa có tài khoản?</Text>
            <Link href="/signup">
              <Text className='text-sky-500 font-bold'>Đăng ký</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  )
}
