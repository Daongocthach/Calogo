import React, { useState } from "react"
import {  Image, View } from "react-native"
import { useForm } from "react-hook-form"
import { useTheme } from "react-native-paper"
import { useTranslation } from "react-i18next"
import { InputField, CustomText, CustomButton } from "@/components"
import useStore from "@/store"
import IMAGES from "@/assets/images"

export default function LoginScreen() {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const { isLoading, signIn } = useStore()
  
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
    <View className="flex-1 w-full px-8 pt-10" style={{ backgroundColor: colors.background }} >
         <View className='flex flex-row items-center justify-center gap-2 mb-8'>
         <Image
          source={IMAGES.LOGO_HEADER_LIGHT}
          style={{ width: 250, height: 75 }} resizeMode="contain"
        />
      </View>
      <View className="flex flex-col gap-2">
        <CustomText className="font-bold mb-2" style={{ fontSize: 20 }}>
          {t("sign in")}
        </CustomText>
        <CustomText className="text-sm mb-4">
          {t("sign in with your credentials")}
        </CustomText>
        <InputField
          control={control}
          rules={{
            required: true,
          }}
          placeholder={t("enter your email")}
          name="email"
          errorMessage={errors.username && t("email is required")}
          inputClassName="mt-2"
        />
        <InputField
          control={control}
          rules={{
            required: true,
          }}
          placeholder={t("enter your password")}
          name="password"
          errorMessage={errors.password && t("password is required")}
          isPassword
          inputClassName="mt-2"
        />
        <CustomButton
          handle={handleSubmit(onSubmit)}
          text={t("sign in")}
          loading={isLoading}
          buttonClassName="p-4 rounded-md mt-2"
        />
      </View>
    </View>


  )
}
