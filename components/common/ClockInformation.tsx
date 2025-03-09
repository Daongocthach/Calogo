import { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useTheme, Icon } from 'react-native-paper'
import CustomText from '@/components/common/CustomText'

const getFormattedTime = () => {
    const now = new Date()
    const formattedDate = now.toLocaleDateString('en-GB')
    const formattedClock = now.toTimeString().slice(0, 8)
    return `${formattedDate} - ${formattedClock}`
}

function ClockInformation() {
    const colors = useTheme().colors
    const [formattedTime, setFormattedTime] = useState(getFormattedTime())

    useEffect(() => {
        const interval = setInterval(() => setFormattedTime(getFormattedTime()), 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <View className='flex flex-row items-center my-4 p-4 rounded-3xl' style={{ backgroundColor: colors.surface }}>
            <Icon source={"clock-outline"} size={20} color={colors.onSurface} />
            <CustomText className='text-sm ml-2 font-medium' style={{ color: colors.onSurface }}>{formattedTime}</CustomText>
        </View>
    )
}

export default ClockInformation