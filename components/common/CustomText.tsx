import { Text, TextProps } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

interface CustomTextProps extends TextProps {
    children: React.ReactNode
    style?: object
    translationKey?: string
}

const CustomText = ({ children, style, translationKey, ...props }: CustomTextProps) => {
    const { colors } = useTheme()
    const { t } = useTranslation()

    return (
        <Text style={[{ color: colors.onBackground }, style ]} {...props} className={`${props.className}`}>
            {translationKey ? t(translationKey) : children}
        </Text>
    )
}


export default CustomText