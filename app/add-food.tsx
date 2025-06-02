import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useLocalSearchParams, useRouter } from 'expo-router'

import { CustomDropDown, CustomInput } from '@/components'
import useStore from '@/store'
import { FoodTypeSelects, FoodTypeProps, FoodTypeSamples, FoodProps } from '@/lib'

export default function AddFoodScreen() {
    const { t } = useTranslation()
    const router = useRouter()
    const { id } = useLocalSearchParams() as { id?: string }

    const { addFood, editFood, foodList } = useStore()
    const [food, setFood] = useState<FoodProps>()
    const [name, setName] = useState('')
    const [carb, setCarb] = useState('')
    const [protein, setProtein] = useState('')
    const [fat, setFat] = useState('')
    const [calorie, setCalorie] = useState('')
    const [foodType, setFoodType] = useState('')

    const isEditMode = !!id

    useEffect(() => {
        if (isEditMode) {
            const food = foodList.find((f) => f.id === id)
            if (food) {
                setFood(food)
                setName(food.name)
                setCarb(String(food.carb_weight))
                setProtein(String(food.protein_weight))
                setFat(String(food.fat_weight))
                setCalorie(String(food.calorie))
                setFoodType(food.food_type?.id)
            }
        }
    }, [id])

    const handleSubmit = () => {
        const foodTypeObject = FoodTypeSamples.find((item) => item.id === foodType)

        if (!name || !carb || !protein || !fat || !calorie || !foodTypeObject) {
            Alert.alert(t('missing information'), t('please fill all fields'))
            return
        }
        const payload = {
            id: isEditMode ? id! : Date.now().toString(),
            name,
            carb_weight: parseFloat(carb),
            protein_weight: parseFloat(protein),
            fat_weight: parseFloat(fat),
            calorie: parseFloat(calorie),
            food_type: foodTypeObject,
        }

        if (isEditMode) {
            editFood(payload)
        } else {
            addFood(payload)
        }

        router.back()
    }


    return (
        <ScrollView contentContainerStyle={{ padding: 16 }} className="flex-1 bg-white">
            <Text className="text-base font-medium mb-1">{t('name')}</Text>
            <CustomInput
                placeholder={t('enter name')}
                value={name}
                onChangeText={setName}
            />

            <Text className="text-base font-medium mb-1">{t('carbohydrates')} (g)</Text>
            <CustomInput
                placeholder={t('enter grams')}
                value={carb}
                onChangeText={setCarb}
                keyboardType="numeric"
            />

            <Text className="text-base font-medium mb-1">{t('protein')} (g)</Text>
            <CustomInput
                placeholder={t('enter grams')}
                value={protein}
                onChangeText={setProtein}
                keyboardType="numeric"
            />

            <Text className="text-base font-medium mb-1">{t('fat')} (g)</Text>
            <CustomInput
                placeholder={t('enter grams')}
                value={fat}
                onChangeText={setFat}
                keyboardType="numeric"
            />

            <Text className="text-base font-medium mb-1">{t('calorie')}</Text>
            <CustomInput
                placeholder={t('enter calories')}
                value={calorie}
                onChangeText={setCalorie}
                keyboardType="numeric"
            />

            <Text className="text-base font-medium mb-1">{t('food type')}</Text>
            <CustomDropDown
                select={foodType}
                setSelect={setFoodType}
                selects={FoodTypeSelects}
            />

            <TouchableOpacity
                className="bg-blue-500 rounded-xl py-4 items-center mt-4"
                onPress={handleSubmit}
            >
                <Text className="text-white text-base font-semibold">
                    {t(isEditMode ? 'edit' : 'add')}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
