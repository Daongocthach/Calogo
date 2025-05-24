import { View, Text, StyleSheet, Image } from "react-native"
import { Drawer } from "expo-router/drawer"
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from "@react-navigation/drawer"
import { router, usePathname } from "expo-router"
import { useTheme } from "react-native-paper"
import { icons } from 'lucide-react-native'
import { useTranslation } from "react-i18next"

import { Icon, DrawerHeader } from "@/components"
import useStore from "@/store"
import { showAlert } from "@/notification"
import { VERSION } from "@/lib"

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { t } = useTranslation()
    const pathname = usePathname()
    const { colors } = useTheme()
    const { isLoggedIn, darkMode, signOut } = useStore()

    const handleRouting = (path: string) => {
        if (path === "/login") {
            showAlert('logout', signOut)
            return
        }
        router.push(path as typeof router.push extends (path: infer P) => any ? P : never)
    }

    type DrawerItemProps = {
        name: string,
        label: string,
        icon: keyof typeof icons,
        path: typeof router.push extends (path: infer P) => any ? P : never,
        isNeedScanNFC?: boolean,
        isAdmin?: boolean,
        isAccessManagerChecklist?: boolean
    }

    const drawerItemList: DrawerItemProps[] = [
        { name: "settings", label: "settings", icon: "Cog", path: "/settings" },
        isLoggedIn ?
            { name: "logout", label: "logout", icon: "LogOut", path: "/login" } :
            { name: "login", label: "login", icon: "LogIn", path: "/login" },
        { name: "menu", label: "menu", icon: "ChefHat", path: "/menu" },
    ]

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.userInfoWrapper}>
                <Image
                    source={require("@/assets/images/avatar.jpg")}
                    width={10}
                    height={10}
                    resizeMode="contain"
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                />
                <View style={styles.userDetailsWrapper}>
                    <Text style={styles.userName}>Username</Text>
                    <Text style={styles.userEmail}>name@email.com</Text>
                </View>
            </View>
            {drawerItemList.map((item) => {
                return (
                    <DrawerItem
                        key={item.name}
                        icon={({ color, size }) => (
                            <Icon
                                name={item.icon}
                                size={size}
                                color={
                                    pathname === item.path ?
                                        (darkMode ? colors.onPrimary : colors.primary) :
                                        colors.onBackground
                                }
                            />
                        )}
                        label={t(item.label)}
                        labelStyle={[
                            styles.navItemLabel,
                            {
                                color: pathname == item.path ?
                                    (darkMode ? colors.onPrimary : colors.primary) :
                                    colors.onBackground
                            }
                        ]}
                        style={[
                            styles.navItem,
                            {
                                backgroundColor: pathname === item.path ?
                                    colors.primaryContainer :
                                    colors.background,

                            }
                        ]}
                        onPress={() => {
                            (item?.isNeedScanNFC || item?.name === 'logout')
                                ? handleRouting(String(item.path))
                                : router.push(item?.path)
                        }}
                    />
                )
            })}

            <DrawerItem
                label={VERSION}
                labelStyle={[styles.navItemLabel, { color: colors.outlineVariant, fontWeight: 500, fontSize: 14 }]}
                style={[
                    styles.navItem,
                    { backgroundColor: colors.background }
                ]}
                onPress={async () => { }}
            />
        </DrawerContentScrollView>
    )
}

export default function DrawerLayout() {
    const { colors } = useTheme()
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                header: ({ route }) => <DrawerHeader title={route.name} />,
                headerShown: false,
                drawerPosition: 'right',
                drawerStyle: { width: "70%" },
            }}
        >
            <Drawer.Screen name="settings" options={{ headerShown: true, title: "Cài đặt" }} />
            <Drawer.Screen name="menu" options={{ headerShown: true, title: "Thực đơn" }} />
            <Drawer.Screen name="login" options={{ headerShown: true, title: "Đăng nhập" }} />
            <Drawer.Screen name="signup" options={{ headerShown: true, title: "Đăng ký" }} />
            <Drawer.Screen name="reset-password" options={{ headerShown: true, title: "Quên mật khẩu" }} />
        </Drawer>
    )
}

const styles = StyleSheet.create({
    navItem: {
        borderRadius: 12,
        marginHorizontal: 5,
        marginVertical: 2,
    },
    navItemLabel: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "semibold",
    },
    userInfoWrapper: {
        flexDirection: "row",
        paddingHorizontal: 10,
        marginVertical: 30,
        alignItems: "center",
    },
    userDetailsWrapper: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 16,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    }
})

