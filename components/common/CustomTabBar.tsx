import { useTheme } from "react-native-paper"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

import CustomText from "@/components/common/CustomText"
import Icon from "@/components/common/Icon"

function CustomTabBar(props: any) {
    const { colors } = useTheme()
    const { t } = useTranslation()
    const { index: activeIndex, routes } = props.navigationState

    return (
        <View className="mb-2">
            <View style={[styles.container, { backgroundColor: colors.surface }]}>
                <View style={styles.tabContainer}>
                    {routes.map((route: any, index: number) => {
                        const isFocused = activeIndex === index
                        return (
                            <TouchableOpacity
                                key={route.key}
                                style={[
                                    styles.tab,
                                    { backgroundColor: isFocused ? colors.primary : colors.surface, borderColor: colors.primary },
                                ]}
                                onPress={() => props.jumpTo(route.key)}
                            >
                                {route?.key === 'manual' &&
                                    <Icon name="CirclePlus" color={isFocused ? colors.onPrimary : '#888'} size={20} />}
                                {route?.key === 'camera' &&
                                    <Icon name="Camera" color={isFocused ? colors.onPrimary : '#888'} size={20} />}
                                <CustomText style={[styles.tabText, isFocused && styles.activeText]}>
                                    {t(route.title)}
                                </CustomText>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
    },
    tabContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        width: '100%',
    },
    tab: {
        padding: 14,
        borderRadius: 12,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    tabText: {
        color: '#888',
        fontWeight: 500
    },
    activeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})

export const renderTabBar = (props: any) => <CustomTabBar {...props} />