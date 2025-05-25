import { useState } from "react"
import { Controller } from "react-hook-form"
import { View, Text, TouchableOpacity } from "react-native"
import { TextInput, Icon, useTheme } from "react-native-paper"

interface InputFieldProps {
    control: any
    name: string
    rules?: object
    placeholder: string
    placeholderTextColor?: string
    label?: string
    autoFocus?: boolean
    inputClassName?: string
    errorMessage?: string
    isPassword?: boolean
    trigger?: any
    readOnly?: any
}

const InputField = ({
    control,
    name,
    rules,
    placeholder,
    label,
    autoFocus = false,
    inputClassName = "",
    errorMessage,
    isPassword,
    trigger,
    readOnly = false
}: InputFieldProps) => {
    const { colors } = useTheme()
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className="relative w-full">
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        readOnly={readOnly}
                        style={{ backgroundColor: colors.surface, fontSize: 10 }}
                        contentStyle={{ fontSize: 15 }}
                        placeholder={placeholder}
                        placeholderTextColor={colors.outline}
                        onBlur={() => {
                            onBlur()
                            trigger && trigger(name)
                        }}
                        onChangeText={onChange}
                        value={value}
                        label={label}
                        autoFocus={autoFocus}
                        className={`w-full ${inputClassName}`}
                        secureTextEntry={!showPassword && isPassword}
                    />
                )}
                name={name}
            />
            {isPassword &&
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: '50%',
                        transform: [{ translateY: -7.5 }],
                    }}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Icon source={showPassword ? 'eye-off-outline' : 'eye-outline'} size={15} color="gray" />
                </TouchableOpacity>
            }
            {errorMessage && <Text className="mt-2" style={{ color: colors.error }}>{errorMessage}</Text>}
        </View>
    )
}

export default InputField