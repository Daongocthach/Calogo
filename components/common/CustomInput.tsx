import React from 'react'
import { useTheme } from 'react-native-paper'
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native'

const CustomInput = (props: TextInputProps) => {
    const { colors } = useTheme()

    return (
        <View style={[styles.container, { borderColor: colors.outline }]}>
            <TextInput
                placeholderTextColor={colors.outlineVariant}
                style={[styles.input, { color: colors.onBackground }]}
                {...props}
                textAlignVertical="center"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        padding: 0,
    },
})

export default CustomInput
