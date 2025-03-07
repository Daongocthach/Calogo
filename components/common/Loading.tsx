import { View } from "react-native"
import { ActivityIndicator, useTheme } from "react-native-paper"

const Loading = ({ customClassName, iconSize }: { customClassName?: string, iconSize?: number }) => {
    const { colors } = useTheme()
    return (
        <View className={`flex-1 justify-center items-center ${customClassName}`}>
            <ActivityIndicator animating={true} color={colors.primary} size={iconSize || 20} />
        </View>
    )
}

export default Loading
