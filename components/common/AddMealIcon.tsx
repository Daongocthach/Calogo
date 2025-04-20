import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import Icon from '@/components/common/Icon'

function AddMealIcon() {
    const { colors } = useTheme()
    const router = useRouter()
    return (
        <TouchableOpacity
            className="absolute bottom-5 right-5 bg-blue-500 p-4 rounded-full shadow-lg"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
            }}
            onPress={() => { router.push('/add-meal') }}
        >
            <Icon name="Plus" size={24} color="white" />
        </TouchableOpacity>
    )
}

export default AddMealIcon