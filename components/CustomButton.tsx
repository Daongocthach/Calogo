import { TouchableOpacity, Text, ActivityIndicator } from "react-native"
import { Icon, useTheme } from "react-native-paper"

type CustomButtonProps = {
    handle: () => void
    children?: React.ReactNode
    style?: object
    textStyle?: object
    icon?: string
    iconSize?: number
    iconColor?: string
    text?: string
    buttonClassName?: string
    textClassName?: string
    backgroundColor?: string
    disabled?: boolean
    loading?: boolean
    outline?: boolean
    ghost?: boolean
    clear?: boolean
}

function CustomButton({
    handle,
    children,
    style,
    textStyle,
    text,
    icon,
    iconSize = 20,
    iconColor,
    buttonClassName = "",
    textClassName = "",
    backgroundColor,
    disabled = false,
    loading = false,
    outline = false,
    ghost = false,
    clear = false
}: CustomButtonProps) {
    const { colors } = useTheme()
    const isIconOnly = !!icon && !text

    const bgColor =
        disabled ? colors.surfaceDisabled :
            ghost || isIconOnly || outline ? "transparent" :
                clear ? "#6b7280" :
                    backgroundColor ?? colors.primary

    const borderColor = (disabled || ghost) ? "transparent" : colors.primary

    const contentColor = iconColor ??
        (disabled ? colors.onSurfaceDisabled :
            (ghost || outline) ? colors.primary :
                colors.onPrimary)



    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={handle}
            style={[{ backgroundColor: bgColor, borderColor, }, style]}
            className={`
                rounded-lg flex flex-row items-center justify-center py-3 px-2.5
                ${isIconOnly && "p-0"}
                ${outline && "border"}
                ${ghost && "border-0 p-0"}
                ${disabled && "opacity-50"}
                ${buttonClassName}
            `}
        >
            {loading ? (
                <ActivityIndicator color={contentColor} />
            ) : (
                icon && <Icon source={icon} size={iconSize} color={contentColor} />
            )}
            {text && (
                <Text
                    style={[{ color: contentColor }, textStyle]}
                    className={`
                        font-medium mx-1
                        ${textClassName}`
                    }
                >
                    {text}
                </Text>
            )}
            {children}
        </TouchableOpacity>
    )
}

export default CustomButton
