import React, { useState } from "react"
import { Dropdown } from "react-native-element-dropdown"
import { StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
import { useTranslation } from 'react-i18next'

type CustomDropDownProps = {
    selects: { label: string, value: string }[]
    select: string
    setSelect: (note: string) => void
    isDisabled?: boolean
    isSearch?: boolean
    placeholder?: string
}

function CustomDropDown({
    selects,
    select,
    setSelect,
    isDisabled = false,
    isSearch,
    placeholder
}: CustomDropDownProps) {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const [isFocus, setIsFocus] = useState(false)
    return (
        <Dropdown
            disable={isDisabled}
            style={{
                ...styles.dropdown,
                minHeight: 40,
                borderColor: isDisabled ? colors.surfaceDisabled : isFocus ? colors.primary : colors.outline,
                borderWidth: isFocus ? 2 : 1,
                borderRadius: 15
            }}
            placeholderStyle={{
                ...styles.placeholderStyle,
                color: isFocus ? colors.primary : colors.outline,
                
            }}
            selectedTextStyle={{
                ...styles.selectedTextStyle,
                color: isDisabled ? colors.surfaceDisabled : isFocus ? colors.primary : colors.outline,
            }}
            containerStyle={{ backgroundColor: colors.background, borderRadius: 15, marginTop: 5 }}
            itemTextStyle={{ color: colors.outline }}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={{
                ...styles.iconStyle,
                tintColor: isDisabled ? colors.surfaceDisabled : isFocus ? colors.primary : colors.outline,
            }}
            data={selects}
            maxHeight={400}
            search={isSearch}
            searchPlaceholder={t('enter to find') + "..."}
            labelField="label"
            valueField="value"
            placeholder={placeholder || t('select an option')}
            value={select}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
                setSelect(item.value)
                setIsFocus(false)
            }}
        />
    )
}

export default CustomDropDown


const styles = StyleSheet.create({
    dropdown: {
        height: 44,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 2,
        paddingHorizontal: 8,
        width: "100%",
        flex: 1
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: '#6b7280'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 10,
    },
    buttonClose: {
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
