import React, { useState } from "react"
import { Dropdown } from "react-native-element-dropdown"
import { StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper"
import { useTranslation } from 'react-i18next'

import useStore from "@/store"
import CustomText from "@/components/common/CustomText"

type CustomDropDownProps = {
    selects: { label: string, value: string }[]
    select: string
    setSelect: (note: string) => void
    isDisabled?: boolean
    isSearch?: boolean
    placeholder?: string,
    isGaugeItem?: boolean
}

function CustomDropDown({
    selects,
    select,
    setSelect,
    isDisabled = false,
    isSearch,
    placeholder,
    isGaugeItem = false
}: CustomDropDownProps) {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const [isFocus, setIsFocus] = useState(false)
    const { darkMode } = useStore()

    return (
        <Dropdown
            disable={isDisabled}
            style={{
                ...styles.dropdown,
                minHeight: 45,
                borderColor: isDisabled ? colors.surfaceDisabled : isFocus ? colors.primary : colors.outline,
                borderWidth: isFocus ? 2 : 1,
                borderRadius: 12
            }}
            placeholderStyle={{
                ...styles.placeholderStyle,
                color: isFocus ? colors.primary : colors.outlineVariant,
            }}
            selectedTextStyle={{
                ...styles.selectedTextStyle,
                color: isDisabled ? colors.surfaceDisabled : isFocus ? colors.primary : colors.onBackground,
            }}
            itemContainerStyle={{
                borderRadius: 12,
            }}
            containerStyle={{ backgroundColor: (darkMode ? colors.surface : colors.background), borderRadius: 12, marginTop: 5 }}
            itemTextStyle={{ color: colors.onBackground }}
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
            renderItem={(item, selected) => (
                <View
                    className="flex flex-row items-center p-4 rounded-xl"
                    style={{ backgroundColor: selected ? colors.surface : 'transparent', borderRadius: 12 }}
                >
                    <CustomText className="text-base font-medium" style={{ color: selected ? colors.primary : colors.onSurfaceVariant }}>
                        {item?.label}
                    </CustomText>
                </View>
            )}
            onChange={(item) => {
                setSelect(item.value)
                !isGaugeItem && setIsFocus(false)
            }}
        />
    )
}

export default CustomDropDown

const styles = StyleSheet.create({
    dropdown: {
        height: 45,
        borderWidth: 0.5,
        borderRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 2,
        width: "100%",
        flex: 1
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
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
    },
    modalView: {
        width: '80%',
        borderRadius: 8,
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