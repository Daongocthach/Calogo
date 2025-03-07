import { Text, TextProps, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

interface CustomTextProps extends TextProps {
    children: React.ReactNode
    style?: object
    translationKey?: string
}

const CustomText = ({ children, style, translationKey, ...props } : CustomTextProps) => {
    const { colors } = useTheme()
    const { t } = useTranslation()

    return (
        <Text style={[styles.defaultStyle, { color: colors.onBackground }, style]} {...props}>
            {translationKey ? t(translationKey) : children}
        </Text>
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        fontSize: 16,
    },
})

export default CustomText